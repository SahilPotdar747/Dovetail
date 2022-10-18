import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { CreateEditFieldsComponent } from '../create-edit-fields/create-edit-fields.component';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
})
export class FieldsComponent implements OnInit {
  isChecked: any;
  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  searchValue = '';
  modalRef?: BsModalRef;
  selected: any = [];
  selectedAll: any = [];
  fieldsData: any;
  currentPage = 1;

  deletePropertyField: any = [];

  ngOnInit(): void {
    this.getFields();
  }

  fieldsList = [
    {
      id: 1,
      project: 23,
      name: 'Drop Zone Hardware Placement',
      display_label: '',
      functional_area: 'Material',
      type: 'Multi Selected',
      fixed_field: 'No',
      is_multi: 'No',
      is_required: 'no',
      builder_name: 'no',
      vendor: 'no',
      isChecked: false,
    },
    {
      id: 2,
      project: 56,
      name: 'Drop Zone Hardware Placement',
      display_label: '',
      functional_area: 'Material',
      type: 'Multi Selected',
      fixed_field: 'No',
      is_multi: 'No',
      is_required: 'no',
      builder_name: 'no',
      vendor: 'no',
      isChecked: false,
    },
    {
      id: 3,
      project: 2,
      name: 'Drop Zone Hardware Placement',
      display_label: '',
      functional_area: 'Material',
      type: 'Multi Selected',
      fixed_field: 'No',
      is_multi: 'No',
      is_required: 'no',
      builder_name: 'no',
      vendor: 'no',
      isChecked: false,
    },
  ];

  async getFields(pagecount: number = 1, value: any = '') {
    try {
      const response = await this.apiEndpoint.getProductTypeFields(
        pagecount,
        value
      );
      this.fieldsData = response;
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditFieldsComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  editPhasesModal(value: any) {
    this.modalRef = this.modalService.show(CreateEditFieldsComponent, {
      initialState: {
        isEdit: true,
        fieldsTableData: value,
      },
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.onSuccess.subscribe((value: any) => {
      this.getFields();
      this.modalRef?.hide();
    });
  }

  searchFields(value: any) {
    this.getFields(1, value);
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

    this.deletePropertyField = this.fieldsData.results.filter((ele: any) =>
      this.selectedAll.includes(ele)
    );
  }

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.fieldsData.results;
      $('input:checkbox').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('input:checkbox').prop('checked', false);
    }
  }

  async deleteArea() {
    try {
      let payloadReq: any = {
        property_id: this.selectedAll.map((ele: any) => ele._id),
      };
      const response = await this.apiEndpoint.deleteProductFields(payloadReq);
      this.getFields();
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any) {
    this.getFields(event.page);
  }
}
