import { event } from 'jquery';
import { CreateEditDocumentComponent } from './../create-edit-document/create-edit-document.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css'],
})
export class DocumentTypesComponent implements OnInit {
  @Input()
  isEdit: boolean = false;

  modalRef?: BsModalRef;
  selected: any = [];
  selectedAll: any = [];
  searchValue = '';
  documentTypesArray: any = [];
  documentTypesSearchArray: any = [];
  currentPage = 1;
  deletedDocumentType: any = [];

  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService
  ) {}

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  async getDocumentTypes(pagecount: number = 1, value: any = '') {
    try {
      this.documentTypesArray = this.documentTypesSearchArray =
        await this.apiEndpoint.getDocument(pagecount, value);
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditDocumentComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.onSuccess.subscribe((value: any) => {
      this.getDocumentTypes();
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
    this.deletedDocumentType = this.documentTypesArray?.results?.filter(
      (ele: any) => this.selectedAll.includes(ele)
    );
  }

  searchdocument(value: any) {
    this.getDocumentTypes(1, value);
  }

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.documentTypesArray.results;
      $('.custom-select-all').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-all').prop('checked', false);
    }
  }

  editPhasesModal(item: any) {
    this.modalRef = this.modalService.show(CreateEditDocumentComponent, {
      initialState: {
        isEdit: true,
        documentTypeData: item,
      },
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  async deleteDocumentType() {
    try {
      let deleteAreaId: any = [];
      deleteAreaId = this.selectedAll.map((ele: any) => ele._id);
      let payloadReq: any = {
        documentTypes_id: deleteAreaId,
      };
      const response = await this.apiEndpoint.deleteDocumentType(payloadReq);
      this.getDocumentTypes();
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any) {
    this.getDocumentTypes(event.page);
  }
}
