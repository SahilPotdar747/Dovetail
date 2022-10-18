import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';

@Component({
  selector: 'app-create-edit-fields',
  templateUrl: './create-edit-fields.component.html',
  styleUrls: ['./create-edit-fields.component.css'],
})
export class CreateEditFieldsComponent implements OnInit {
  @Input()
  isEdit: boolean = false;
  @Input()
  fieldsTableData: boolean = false;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();
  selected: any = [];
  functionalArea: any;
  type: any;
  checkValidation: boolean = false;
  items = [
    { name: 'Product' },
    { name: 'Property' },
    { name: 'Community' },
    { name: 'Checklist' },
    { name: 'Team' },
    { name: 'Material' },
  ];

  types = [
    { name: 'Text' },
    { name: 'RichText' },
    { name: 'Number' },
    { name: 'Date' },
    { name: 'Checkbox' },
    { name: 'Multi Select' },
    { name: 'Property Trigger' },
    { name: 'Team' },
    { name: 'User' },
    { name: 'Document' },
    { name: 'Signing' },
    { name: 'Warning Or Reminder' },
  ];

  productTypeFields: any = {
    name: '',
    displayLabel: '',
    type: '',
    isFixedField: null,
    includeByDefault: false,
    isMulti: false,
    isRequired: false,
    showToBuilder: false,
    showToVendor: false,
    isIncludedInSelectorMode: null,
  };
  constructor(private apiEndpoint: ApiEndpointService) {}

  ngOnInit(): void {
    if (this.isEdit) {
      this.productTypeFields = this.fieldsTableData;
    }
  }

  onFocusOut(value?: any) {
    this.productTypeFields.type = value;

    if (value == undefined) {
      this.checkValidation = true;
    }
  }

  async createField() {
    try {
      let payloadReq: any = {
        name: this.productTypeFields.name,
        displayLabel: this.productTypeFields.displayLabel,
        type: this.productTypeFields.type,
        businessObject: 'Product',
        isFixedField: this.productTypeFields.isFixedField
          ? this.productTypeFields.isFixedField
          : null,
        includeByDefault: this.productTypeFields.includeByDefault,
        isMulti: this.productTypeFields.isMulti,
        isRequired: this.productTypeFields.isRequired,
        showToBuilder: this.productTypeFields.showToBuilder,
        showToVendor: this.productTypeFields.showToVendor,
        isIncludedInSelectorMode:
          this.productTypeFields.isIncludedInSelectorMode,
      };
      let response = await this.apiEndpoint.createProductFields(payloadReq);
      this.cancelModal();
    } catch (error) {
      console.log(error);
    }
  }

  async updateField() {
    try {
      let payloadReq: any = {
        name: this.productTypeFields.name,
        displayLabel: this.productTypeFields.displayLabel,
        type: this.productTypeFields.type,
        businessObject: 'Product',
        isFixedField: this.productTypeFields.isFixedField
          ? this.productTypeFields.isFixedField
          : null,
        includeByDefault: this.productTypeFields.includeByDefault,
        isMulti: this.productTypeFields.isMulti,
        isRequired: this.productTypeFields.isRequired,
        showToBuilder: this.productTypeFields.showToBuilder,
        showToVendor: this.productTypeFields.showToVendor,
        isIncludedInSelectorMode:
          this.productTypeFields.isIncludedInSelectorMode,
      };
      let response = await this.apiEndpoint.updateProductFields(
        payloadReq,
        this.productTypeFields._id
      );
      this.cancelModal();
    } catch (error) {
      console.log(error);
    }
  }

  submitForm() {
    if (this.isEdit) {
      this.updateField();
    } else {
      this.createField();
    }
    this.onFocusOut();
  }

  cancelModal() {
    this.onSuccess.emit();
  }
}
