import { event } from 'jquery';
import { DocumentUploadComponent } from './../document-upload/document-upload.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-edit-section',
  templateUrl: './create-edit-section.component.html',
  styleUrls: ['./create-edit-section.component.css']
})
export class CreateEditSectionComponent implements OnInit {
  isAddMode: boolean = false;
  isdocument: boolean = false
  sectionlistTypeData: any = [];
  filterdocument: any;
  @Input()
  isEdit: boolean = false;
  // isSelected: any = [];
  selectedAll: any = [];
  modalRef: any;
  SelectAll: boolean = true;
  SelectNone: boolean = true;
  items: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  //  manage drag elemet state
  draggedIndex: any;
  selectedSectionList: any = [];
  tenantAreaId: any = [];
  sectionList: any = [];
  tenantData: any = [];
  tenantId:string=" "



  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService,
    private componentCommunicateService: ComponentCommunicationService
  ) {

  }
  sectionTypeData: any = {
    name: '',
    isActive: false,
    categories: [],
    documentOrderItems: [],
    taskId: '',
  };
  currentUserData: any = [];

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.currentUserData = JSON.parse(
      sessionStorage.getItem('current_user_details') || ''
    );
    // console.log(this.currentUserData);
    // this.sectionTypeData = this.sectionlistTypeData;
    if (this.isEdit) {
      this.sectionTypeData = this.sectionlistTypeData;
    }

    this.filterdocument = this.docs;
    this.getcategories();
    this.getTenant();
  }
  // tenant user id
  async getTenant() {
    try {
      this.componentCommunicateService.showLoader();
      const response = await this.apiEndpoint.getTenant();
      this.tenantData = response;
      this.componentCommunicateService.closeLoader();
      return this.tenantData.filter((ele: any) => (this.tenantId = ele._id));
      // this.tenantData = await this.apiEndpoint.getTenant();
    } catch (error) {
      console.log(error);
    }
  }
  onFocusOut(id: any) {
    this.tenantAreaId = id;
  }
  async createSection() {
    try {
      this.componentCommunicateService.showLoader();
      const payloadReq = {
        name: this.sectionTypeData.name,
        // id: this.sectionTypeData.taskId,
        // sections: this.sectionTypeData.sections,
        categories: this.selectedSectionList.map((e: any) => e._id),
        isActive: this.sectionTypeData.isActive,
        documentOrderItems: this.sectionTypeData.documentOrderItems,
        userId: this.currentUserData[0]._id,
        tenantArea_id: this.tenantAreaId,
      };
      const response = await this.apiEndpoint.createSection(payloadReq);
      this.componentCommunicateService.addNode({
        componentName: 'sectionComponent',
        data: response,
      })
      this.componentCommunicateService.closeLoader();
    } catch (error) {
      console.log(error);
    }
    this.closeModalEmitter.emit();
  }

  async getcategories() {
    try {
      this.componentCommunicateService.showLoader();
      const response:any = await this.apiEndpoint.productTypeCategories();
      console.log("response check",response);
      this.sectionList = response;
      if (this.isEdit) {
        this.sectionTypeData.categories.forEach((ele: any) => {
          this.selectedSectionList.push(
            this.sectionList.find((e: any) => e._id == ele)
          );

          this.sectionList = this.sectionList.filter((e: any) => e._id != ele);
        });
      }
      this.componentCommunicateService.closeLoader();
    } catch (error) {
      console.log(error);
    }
  }
  // update list
  async updateSection() {
    try {
      this.componentCommunicateService.showLoader();
      const payloadReq = {
        name: this.sectionTypeData.name,
        id: this.sectionTypeData._id ? this.sectionTypeData._id : null,
        categories: this.selectedSectionList.map((e: any) => e._id),
        isActive: this.sectionTypeData.isActive,
        documentOrderItems: this.sectionTypeData.documentOrderItems,
        userId: this.currentUserData[0]._id,
        tenantArea_id: this.tenantAreaId,
      };
      console.log(payloadReq);
      const response = await this.apiEndpoint.updateSection(this.sectionTypeData._id, payloadReq);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // this.onSuccess.emit();
    // this.closeModalEmitter.emit();
    this.cancelModal();
    this.onSuccess.emit();
  }


  docs = [
    {
      id: 111,
      doc_name: 'Guidlines.pdf',
      doc_time: '2022-07-07 07:09',
      doc_type: 'Cabinet CADs',
      isChecked: false,
    },
    {
      id: 112,
      doc_name: 'Guidlines.pdf',
      doc_time: '2022-07-07 07:09',
      doc_type: 'Cabinet CADs',
      isChecked: false,
    },
    {
      id: 113,
      doc_name: 'Guidlines.pdf',
      doc_time: '2022-07-07 07:09',
      doc_type: 'Cabinet CADs',
      isChecked: false,
    },
  ];
  // onSave() {
  //   this.closeModalEmitter.emit();
  // }
  cancelModal() {
    this.closeModalEmitter.emit();
  }
  opendocumentuploaderModal() {
    this.modalRef = this.modalService.show(DocumentUploadComponent, {
      class: 'modal-dialog  modal-md modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }
  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.modalRef?.hide();
    });
  }
  // all select check box
  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.docs;
      $('.custom-select').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select').prop('checked', false);
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
  }
  showDocument() {
    this.isdocument = true
  }
  closeDocument() {
    this.isdocument = false
  }
  // toggleButton() {
  //   this.SelectAll = !this.SelectAll
  // }
  // selectAll() {
  //   this.SelectNone = !this.SelectNone
  // }
  selectAllAvailableSections(){
    if (this.sectionList.length > 1) {
      this.selectedSectionList = this.sectionList;
      this.sectionList = [];
    } else {
      this.sectionList = this.selectedSectionList;
      this.selectedSectionList = [];
    }
  }
  selectAllSelectedSections(){
    if (this.selectedSectionList.length > 1) {
      this.sectionList = this.selectedSectionList;
      this.selectedSectionList = [];
    } else {
      this.selectedSectionList = this.sectionList;
      this.sectionList = [];
    }
  }
  // sort all function
  sortSelectedSectionList() {
    this.selectedSectionList.sort((a: any, b: any) => {
      console.log("check selected data",this.selectedSectionList);
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  // drag n drop

  dragDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
