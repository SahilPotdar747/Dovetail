import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { DocumentUploadComponent } from '../document-upload/document-upload.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-edit-roomtypes',
  templateUrl: './create-edit-roomtypes.component.html',
  styleUrls: ['./create-edit-roomtypes.component.css'],
})
export class CreateEditRoomtypesComponent implements OnInit {
  @Input()
  isEdit: boolean = false;
  @Input()
  areaTypeData: any = [];
  selectedAll: any = [];
  tenantAreaId: any = [];
  sectionList: any = [];
  selectedSectionList: any = [];

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private apiEndpoint: ApiEndpointService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}
  modalRef?: BsModalRef;
  tenantData: any = [];
  tenantId: string = '';
  roomTypeData: any = {
    name: '',
    isActive: false,
    sections: [],
    documentOrderItems: [],
    taskId: '',
  };
  currentUserData: any = [];

  ngOnInit(): void {
    this.currentUserData = JSON.parse(
      sessionStorage.getItem('current_user_details') || ''
    );
    if (this.isEdit) {
      this.roomTypeData = this.areaTypeData;
    }
    this.getTenant();
    this.getSection();
  }

  async getTenant() {
    try {
      this.tenantData = await this.apiEndpoint.getAllTenant();
      return this.tenantData.filter((ele: any) => (this.tenantId = ele._id));
    } catch (error) {
      console.log(error);
    }
  }

  onFocusOut(value: any) {
    if (value == 'selectAll') {
      this.tenantData.filter((ele: any) => this.tenantAreaId.push(ele._id));
    } else {
      this.tenantAreaId = value;
    }
  }

  async createArea() {
    try {
      const payloadReq = {
        name: this.roomTypeData.name,
        sections: this.selectedSectionList.map((e: any) => e._id),
        isActive: this.roomTypeData.isActive,
        documentOrderItems: this.roomTypeData.documentOrderItems,
        userId: this.currentUserData[0]._id,
        tenantArea_id: this.tenantAreaId,
      };
      const response = await this.apiEndpoint.createArea(payloadReq);
      this.cancelModal();
    } catch (error) {
      console.log(error);
    }
  }

  async getSection() {
    try {
      const response = await this.apiEndpoint.getAllSection();

      this.sectionList = response;
      if (this.isEdit) {
        this.roomTypeData.sections.forEach((ele: any) => {
          this.selectedSectionList.push(
            this.sectionList.find((e: any) => e._id == ele)
          );
          this.sectionList = this.sectionList.filter((e: any) => e._id != ele);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  cancelModal() {
    this.onSuccess.emit();
  }

  async updateArea() {
    try {
      const payloadReq = {
        name: this.roomTypeData.name,
        id: this.roomTypeData._id ? this.roomTypeData._id : null,
        sections: this.selectedSectionList.map((e: any) => e._id),
        isActive: this.roomTypeData.isActive,
        documentOrderItems: this.roomTypeData.documentOrderItems,
        userId: this.currentUserData[0]._id,
        tenantArea_id: this.tenantAreaId,
      };
      const response = await this.apiEndpoint.updateArea(
        payloadReq,
        this.roomTypeData._id
      );
      this.cancelModal();
      this.onSuccess.emit();
    } catch (error) {
      console.log(error);
    }
  }

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

  selectAllAvailableSections() {
    if (this.sectionList.length > 1) {
      this.selectedSectionList = this.sectionList;
      this.sectionList = [];
    } else {
      this.sectionList = this.selectedSectionList;
      this.selectedSectionList = [];
    }
  }

  selectAllSelectedSections() {
    if (this.selectedSectionList.length > 1) {
      this.sectionList = this.selectedSectionList;
      this.selectedSectionList = [];
    } else {
      this.selectedSectionList = this.sectionList;
      this.sectionList = [];
    }
  }

  sortSelectedSectionList() {
    this.selectedSectionList.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  sumbitForm() {
    if (this.isEdit) {
      this.updateArea();
    } else {
      this.createArea();
    }
  }
}
