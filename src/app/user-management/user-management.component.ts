import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { CreateEditUserModalComponent } from '../create-edit-user-modal/create-edit-user-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  modalRef?: BsModalRef;
  isSelected: any = [];
  searchValue = '';
  getAllUsers: any = [];
  userSearch: any = [];
  selectedAll: any = [];
  deleteSelectedData: any = [];
  currentPage = 1;

  ngOnInit(): void {
    this.getUser();
  }

  async getUser(pagecount: number = 1, value: any = '') {
    try {
      const response = await this.apiEndpoint.getUser(pagecount, value);
      this.getAllUsers = this.userSearch = response;
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditUserModalComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  editusersListModal(item: any) {
    this.modalRef = this.modalService.show(CreateEditUserModalComponent, {
      initialState: {
        isEdit: true,
        userData: item,
      },
      class: 'modal-dialog modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.getUser();
      this.modalRef?.hide();
    });
  }

  searchUsers() {
    if (this.searchValue != null) {
      if (this.searchValue == '') {
        this.getAllUsers = this.userSearch;
      }
      const search = this.getAllUsers.filter((e: any) =>
        e?.name.toLowerCase().includes(this.searchValue.toLocaleLowerCase())
      );
      this.getAllUsers = search;
    }
  }

  onSelect(event?: any, value?: any) {
    if (event.target.checked) {
      this.selectedAll.push(value);
    } else if (!event.target.checked) {
      this.selectedAll = this.selectedAll.filter((x: any) => {
        if (value == x) {
          return false;
        } else {
          return true;
        }
      });
    }

    this.deleteSelectedData = this.getAllUsers.filter((ele: any) =>
      this.selectedAll.includes(ele)
    );
  }

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.getAllUsers;
      $('.custom-control-input').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-control-input').prop('checked', false);
    }
  }

  async deleteUser() {
    try {
      const response = await this.apiEndpoint.deleteAdminUser(this.selectedAll);
      this.selectedAll = [];
      this.getUser();
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any) {
    this.getUser(event.page);
  }
}
