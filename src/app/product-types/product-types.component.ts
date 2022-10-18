import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentCommunicationService } from '../component-communication.service';
import { CreateEditProducttypesComponent } from '../create-edit-producttypes/create-edit-producttypes.component';

//importing api-endpoint-service
import { ApiEndpointService } from '../api-endpoint.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css'],
})
export class ProductTypesComponent implements OnInit {
  @Input()
  // isEdit: boolean = false;
  @Output()
  successEmitter: EventEmitter<any> = new EventEmitter();
  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  isChecked: any;
  filteredList: any = [];
  currentPage = 1;
  // cancelEmitter: any;
  constructor(
    private modalService: BsModalService,
    private communicationService: ComponentCommunicationService,
    private api_endpoint: ApiEndpointService
  ) {}

  modalRef?: BsModalRef;
  searchValue = '';
  selected: any = [];
  selectedAll: any = [];
  productData: any = [];
  functional: any;

  ngOnInit(): void {
    this.getProductTypeData();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateEditProducttypesComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  async editPhasesModal(product: any) {
    this.modalRef = this.modalService.show(CreateEditProducttypesComponent, {
      initialState: {
        isEdit: true,
        getProductData: product,
      },
      class: 'modal-dialog modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
    });

    const response = await this.api_endpoint.getProductType();
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.modalRef?.hide();
    });

    this.modalRef?.content.onSuccess.subscribe((value: any) => {
      this.getProductTypeData();
      this.modalRef?.hide();
    });
  }

  cancelModal() {
    this.closeModalEmitter.emit();
  }

  searchProduct(value: any) {
    this.getProductTypeData(1, value);
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

  isModalCheck(val: any) {
    this.communicationService.modalPermissionsFunction(val['name']);
  }

  selectAllCheckbox(evt: any) {
    if (evt.target.checked) {
      this.selectedAll = $('.custom-select-all').prop('checked', true);
      $('.custom-select-all').prop('checked', true);
    } else if (!evt.target.checked) {
      this.selectedAll = [];
      $('.custom-select-all').prop('checked', false);
    }
  }

  // get product types data
  async getProductTypeData(pagecount: number = 1, value: any = '') {
    try {
      this.communicationService.showLoader();
      const response = await this.api_endpoint.getProductType(pagecount, value);
      this.productData = response;
      this.communicationService.closeLoader();
      this.closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  // Delete product types data
  async deleteProductTypesData() {
    try {
      let payloadReq: any = {
        productTypes_id: this.selectedAll.map((ele: any) => ele._id),
      };
      const response = await this.api_endpoint.deleteProductType(payloadReq);
      this.getProductTypeData();
      this.selectedAll = [];
    } catch (error) {
      console.log(error);
    }
  }

  // pagination functionality
  pageChanged(event: any): void {
    this.getProductTypeData(event.page);
  }
}
