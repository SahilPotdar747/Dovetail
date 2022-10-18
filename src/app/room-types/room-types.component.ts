import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { CreateEditRoomtypesComponent } from '../create-edit-roomtypes/create-edit-roomtypes.component';
@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css'],
})
export class RoomTypesComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService
  ) {}
  roomTypesSearch: any = [];
  roomTypes: any = [];
  modalRef?: BsModalRef;
  selected: any = [];
  selectedAll: any = [];
  searchValue = '';
  deleteAreaName: any = [];
  currentPage = 1;
  ngOnInit(): void {
    this.getArea();
  }

  async getArea(pagecount: number = 1, value: any = '') {
    try {
      const response = await this.apiEndpoint.getArea(pagecount, value);
      this.roomTypes = this.roomTypesSearch = response;
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditRoomtypesComponent, {
      class: 'modal-dialog modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.onSuccess.subscribe((value: any) => {
      this.getArea();
      this.modalRef?.hide();
    });
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

    this.deleteAreaName = this.roomTypes?.results?.filter((ele: any) =>
      this.selectedAll.includes(ele)
    );
  }

  searchRoomTypes(value: any) {
    this.getArea(1, value);
  }

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.roomTypes.results;

      $('.custom-select-all').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-all').prop('checked', false);
    }
    // this.deleteAreaName = this.selectedAll;
  }

  editPhasesModal(item: any) {
    this.modalRef = this.modalService.show(CreateEditRoomtypesComponent, {
      initialState: {
        isEdit: true,
        areaTypeData: item,
      },
      class: 'modal-dialog modal-lg',
      ignoreBackdropClick: true,
    });

    this.closeModal();
  }

  async deleteArea() {
    try {
      let payloadReq: any = {
        areas_id: this.selectedAll.map((ele: any) => ele._id),
      };
      const response = await this.apiEndpoint.deleteArea(payloadReq);
      this.getArea(15, 1);
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any) {
    this.getArea(event.page);
  }
}
