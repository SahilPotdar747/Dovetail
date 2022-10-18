import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { CreateEditSectionComponent } from '../create-edit-section/create-edit-section.component';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  searchValue = '';
  filteredData: any;
  isChecked: any;
  selectedAll: any = [];
  SectionList: any = [];
  modalRef?: BsModalRef;
  selected: any = [];
  selectedName: any;
  sectionTypesSearch: any = [];
  currentPage = 1;
  deleteSectionName: any[] = [];

  constructor(
    private modalService: BsModalService,
    private apiEndpoint: ApiEndpointService,
    private componentCommunicateService: ComponentCommunicationService
  ) {
    this.componentCommunicateService.node$.subscribe((a: any) => {
      if (a != null) {
        if (a.componentName == 'sectionComponent') {
          this.SectionList.push(a.data);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getSection();
  }
  async getSection(pagecount: number = 1, value: any = '') {
    try {
      this.componentCommunicateService.showLoader();
      const response = await this.apiEndpoint.getSection(pagecount, value);
      this.SectionList = this.sectionTypesSearch = response;
      this.componentCommunicateService.closeLoader();
    } catch (error) {
      console.log(error);
    }
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditSectionComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.getSection();
      this.modalRef?.hide();
    });
  }

  searchsection(value: any) {
    this.getSection(1, value);
    console.log("value data",value);
  }

  onSelect(event: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(event.target.checked);
  }

  onSelect1(event?: any, value?: any) {
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
    this.deleteSectionName = this.SectionList?.results?.filter((ele: any) =>
      this.selectedAll.includes(ele)
    );
  }
  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.SectionList.results;
      $('.custom-select-all').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-all').prop('checked', false);
    }
    this.deleteSectionName = this.selectedAll;
    console.log(this.deleteSectionName);
  }

  async editSectionModal(item: any) {
    this.modalRef = this.modalService.show(CreateEditSectionComponent, {
      initialState: {
        isEdit: true,
        sectionlistTypeData: item,
      },
      class: 'modal-dialog modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  async deleteSection() {
    try {
      let payloadReq: any = {
        sections_id: this.selectedAll.map((ele: any) => ele._id),
      };
      const response = await this.apiEndpoint.deleteSection(payloadReq);
      this.getSection(15, 1);
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  pageChanged(event: any): void {
    this.getSection(event.page);
  }
}
