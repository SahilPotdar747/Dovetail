import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { DocumentUploadComponent } from '../document-upload/document-upload.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-edit-producttypes',
  templateUrl: './create-edit-producttypes.component.html',
  styleUrls: ['./create-edit-producttypes.component.css'],
})
export class CreateEditProducttypesComponent implements OnInit {
  @Input()
  isEdit: boolean = false;
  @Input()
  getProductData: any = [];

  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();

  isCheckListBo: boolean = false;
  // permission list
  isBasicInfo: boolean = false;
  isMaterialField: boolean = false;
  isDocument: boolean = false;
  isAreas: boolean = false;
  isBudgetTab: boolean = false;
  // isAdvanced: boolean = false;

  tenantData: any = [];
  tenantAreaId: any = [];
  tenantId: string = '';
  dependencie: any;

  modalRef?: BsModalRef;
  selectedAll: any = [];
  searchValue = '';

  fiterAreas: any;
  //areas
  areaData: any;
  // budget
  budgetData: any;

  //chnage button
  selectAll: boolean = true;
  selectNone: boolean = true;

  areaType: any;
  // budgetArea:any;
  budgetSection: any;
  budgetCategory: any;

  constructor(
    private modalService: BsModalService,
    private communicationService: ComponentCommunicationService,
    private apiEndpoint: ApiEndpointService
  ) {}

  // create product type

  productTypeData: any = {
    name: '',
    _id: '',
    defaultBOName: '',
    description: '',
    propertyValues: [],
    businessObject: 'Product',
  };

  ngOnInit(): void {
    if (this.isEdit) {
      this.productTypeData = this.getProductData;
    }
    //areas
    this.areaData = this.areas;
    // budget
    this.budgetData = this.budgets;

    this.getProductTypeFields();
    this.getTenant();
  }

  buttonToggle() {
    this.selectAll = !this.selectAll;
  }
  buttonSwitch() {
    this.selectNone = !this.selectNone;
  }

  // Area type for Areas
  areaTypes = [
    { id: 1001, area_type: 'Bathroom' },
    { id: 1002, area_type: 'Dinning Room' },
    { id: 1003, area_type: 'Exercise Room' },
    { id: 1004, area_type: 'Exterior' },
    { id: 1005, area_type: 'Kitchen' },
  ];

  // In budgetTab
  sections = [
    { id: 2001, budget_section: 'Accent color' },
    { id: 2002, budget_section: 'Appliance' },
    { id: 2003, budget_section: 'Backsplash' },
    { id: 2004, budget_section: 'Balcony' },
    { id: 2005, budget_section: 'Bathroom floor' },
  ];

  // In budgetTab
  categories = [
    { id: 3001, budget_category: 'Dishwasher' },
    { id: 3002, budget_category: 'Concrete Flooring' },
    { id: 3003, budget_category: 'Microwave' },
    { id: 3004, budget_category: 'Tub' },
  ];

  // dropdown values in array
  deps = [
    { name: 'Accent Color' },
    { name: 'Appliance' },
    { name: 'Backsplash' },
    { name: 'Balcony' },
    { name: 'Bath Accessories' },
    { name: 'Cabinetry' },
    { name: 'Closets' },
    { name: 'Countertop' },
  ];

  // values in array for areas section
  areas = [
    {
      id: 21,
      area_name: 'first',
      area_type: '1st',
      isChecked: false,
    },
    {
      id: 22,
      area_name: 'second',
      area_type: '2nd',
      isChecked: false,
    },
    {
      id: 23,
      area_name: 'third',
      area_type: '3rd',
      isChecked: false,
    },
  ];

  // values in array for budget section
  budgets = [
    {
      id: 51,
      index: 'test',
      area_type: 'test',
      area: 'test',
      section: 'test',
      category: 'test',
      budget: 'test',
      isChecked: false,
    },
    {
      id: 52,
      index: 'test1',
      area_type: 'test1',
      area: 'test1',
      section: 'test1',
      category: 'test1',
      budget: 'test1',
      isChecked: false,
    },
    {
      id: 53,
      index: 'test2',
      area_type: 'test2',
      area: 'test2',
      section: 'test2',
      category: 'test2',
      budget: 'test2',
      isChecked: false,
    },
  ];

  // drag and drop fields array (create product type)
  productFields: any = [];
  selectedProductFields: any = [];

  //values in array for document section
  docs = [
    {
      id: 111,
      doc_name: 'document-1',
      doc_time: '2022-07-04 09:45',
      doc_type: 'Technical Specification',
      isChecked: false,
    },
    {
      id: 112,
      doc_name: 'document-2',
      doc_time: '2022-07-04 09:45',
      doc_type: 'Technical Specification',
      isChecked: false,
    },
    {
      id: 113,
      doc_name: 'document-3',
      doc_time: '2022-07-04 09:45',
      doc_type: 'Technical Specification',
      isChecked: false,
    },
  ];

  async createProductType() {
    this.communicationService.showLoader();
    try {
      let payloadReq = {
        name: this.productTypeData.name,
        defaultBOName: this.productTypeData.defaultBOName,
        description: this.productTypeData.description,
        propertyValues: this.selectedProductFields?.map((e: any) => e),
        businessObject: this.productTypeData.businessObject,
        isActive: this.productTypeData.isActive,
      };
      const response = await this.apiEndpoint.createProductType(payloadReq);

      this.cancelModal();
      this.onSuccess.emit();
      this.communicationService.closeLoader();
    } catch (error) {
      console.log(error);
    }
  }

  // get product types field data
  async getProductTypeFields() {
    try {
      const response: any = await this.apiEndpoint.getProductField();
      this.productFields = response;
      if (this.isEdit) {
        this.productTypeData?.propertyValues?.forEach((ele: any) => {
          this.selectedProductFields.push(
            this.productFields.find((e: any) => e._id == ele._id)
          );
          this.productFields = this.productFields.filter(
            (e: any) => e._id != ele._id
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  openDocumentUploaderModal() {
    this.modalRef = this.modalService.show(DocumentUploadComponent, {
      class: 'modal-dialog modal-dialog-centered  modal-md',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.modalRef?.hide();
    });
  }
  cancelModal() {
    // this.closeModalEmitter.emit();
    this.onSuccess.emit();
  }

  // for area searching code here
  searchArea() {
    if (this.searchValue != null) {
      const search = this.areas.filter((e: any) =>
        e?.area_name
          .toLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
      this.areaData = search;
    } else {
      this.areaData = this.areas;
    }
  }

  // for budget searching code here
  searchBudget() {
    if (this.searchValue != null) {
      const search = this.budgets.filter((e: any) =>
        e?.area_type
          .toLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
      this.budgetData = search;
    } else {
      this.budgetData = this.budgets;
    }
  }

  // modal permissions check function

  // All Select Checkbox for docs
  selectAllCheckboxDoc(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.docs;
      $('.custom-select-allDoc').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-allDoc').prop('checked', false);
    }
  }

  // All select checkbox for area
  selectAllCheckboxArea(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.areas;
      $('.custom-select-allAreas').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-allAreas').prop('checked', false);
    }
  }

  // All select checkbox for budget
  selectAllCheckboxBudget(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.budgets;
      $('.custom-select-allBudget').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('.custom-select-allBudget').prop('checked', false);
    }
  }

  //single select
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

  // Drag and drop functionality OF product type fields

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

  async onSave() {
    try {
      const payloadReq = {
        name: this.productTypeData.name,
        id: this.productTypeData._id ? this.productTypeData._id : null,
        defaultBOName: this.productTypeData.defaultBOName,
        description: this.productTypeData.description,
        isActive: this.productTypeData.isActive,
        propertyValues: this.selectedProductFields?.map((e: any) => {
          if (e != undefined) {
            let x = {
              ...e,
              propertyId: e._id,
            };
            return x;
          } else {
            return null;
          }
        }),
      };
      this.communicationService.showLoader();
      const response = await this.apiEndpoint.updateProductType(
        payloadReq,
        this.productTypeData._id
      );
      this.cancelModal();
      this.onSuccess.emit();
      this.communicationService.closeLoader();
    } catch (error) {
      console.log(error);
    }
  }
  // dropdown list of product types
  onFocusOut(value: any) {
    if (value == 'selectAll') {
      this.tenantData.filter((ele: any) => this.tenantAreaId.push(ele._id));
    } else {
      this.tenantAreaId = value;
    }
  }

  // get tenant data
  async getTenant() {
    try {
      this.communicationService.showLoader();
      const response = await this.apiEndpoint.getTenant();
      this.tenantData = response;
      this.communicationService.closeLoader();
      return this.tenantData.filter((ele: any) => (this.tenantId = ele._id));
    } catch (error) {
      console.log(error);
    }
  }

  // Selecting all unselecting all Tenant fields data
  selectAllAvailableSection() {
    if (this.productFields.length > 1) {
      this.selectedProductFields = this.productFields;
      this.productFields = [];
    } else {
      this.productFields = this.selectedProductFields;
      this.selectedProductFields = [];
    }
  }

  // sorting Available Fields data
  sortAvailableFields() {
    this.selectedProductFields.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
