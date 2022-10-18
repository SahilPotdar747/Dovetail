import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { CreateEditTenantUserComponent } from '../create-edit-tenant-user/create-edit-tenant-user.component';

@Component({
  selector: 'app-tenant-user',
  templateUrl: './tenant-user.component.html',
  styleUrls: ['./tenant-user.component.css'],
})
export class TenantUserComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  modalRef?: BsModalRef;
  tenantUserData: any = [];
  selectedAll: any = [];
  searchValue = '';
  tenantUserDataSearch: any = [];
  currentPage = 1;
  deleteSelectedData: any = [];
  ngOnInit(): void {
    this.getTenantUsers();
  }

  async getTenantUsers(pagecount: number = 1, value: any = '') {
    try {
      let response = await this.apiEndpoint.getTenant(pagecount, value);
      this.tenantUserData = this.tenantUserDataSearch = response;
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditTenantUserComponent, {
      class: 'modal-dialog modal-md modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.onSuccess.subscribe((value: any) => {
      this.getTenantUsers();
      this.modalRef?.hide();
    });
  }

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.tenantUserData;
      $('.custom-select-all').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-all').prop('checked', false);
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

    this.deleteSelectedData = this.tenantUserData.results.filter((ele: any) =>
      this.selectedAll.includes(ele)
    );
  }

  searchTenantUsers() {
    if (this.searchValue != null) {
      if (this.searchValue == '') {
        this.tenantUserData = this.tenantUserDataSearch;
      }
      const search = this.tenantUserData.filter((e: any) =>
        e?.tenant_name
          .toLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
      this.tenantUserData = search;
    }
  }

  async deleteTenantUser() {
    try {
      let deleteTenantUserId: any;
      this.selectedAll.filter((ele: any) => (deleteTenantUserId = ele._id));
      let response = await this.apiEndpoint.deleteTenantUser(
        deleteTenantUserId
      );
      this.getTenantUsers();
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any) {
    this.getTenantUsers(event.page);
  }
}
