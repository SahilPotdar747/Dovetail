import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';

@Component({
  selector: 'app-create-edit-document',
  templateUrl: './create-edit-document.component.html',
  styleUrls: ['./create-edit-document.component.css'],
})
export class CreateEditDocumentComponent implements OnInit {
  @Input()
  isEdit: boolean = false;

  @Input()
  documentTypeData: any = [];

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();
  modalRef: any;
  formNameValidation: boolean = false;
  documentTypes: any = {
    name: '',
    availableInBuilderMode: false,
    builderCanAdd: false,
    availableInVendorMode: false,
    availableInSelectorMode: false,
    includedInProductCard: false,
    includedInHomeownerExport: false,
    isActive: false,
    isAppendix: false,
    canExportedSeparatedPDF: false,
    _id: '',
  };
  businessObjectContexts: any = [];
  allowedDocumentTypes: any = [];
  constructor(private apiEndpoint: ApiEndpointService) {}
  ngOnInit(): void {
    if (this.isEdit) {
      this.documentTypes = this.documentTypeData;
      this.allowFileType.forEach((ele: any, i) => {
        if (
          this.documentTypes?.allowedDocumentTypes?.some(
            (p: any) => p.toLowerCase() == ele.name.toLowerCase()
          )
        ) {
          this.allowFileType[i].isChecked = true;
        }
      });

      this.functionalAreaContexts.forEach((ele: any, i: any) => {
        if (
          this.documentTypes?.businessObjectContexts?.some(
            (p: any) => p.toLowerCase() == ele.name.toLowerCase()
          )
        ) {
          this.functionalAreaContexts[i].isChecked = true;
        }
      });
    }
  }

  allowFileType = [
    {
      name: 'Image',
      _id: 'allowFileType01',
      isChecked: false,
    },
    {
      name: 'Word',
      _id: 'allowFileType02',
      isChecked: false,
    },
    {
      name: 'PDF',
      _id: 'allowFileType03',
      isChecked: false,
    },
    {
      name: 'Excel',
      _id: 'allowFileType04',
      isChecked: false,
    },
    {
      name: 'Powerpoint',
      _id: 'allowFileType05',
      isChecked: false,
    },
    {
      name: 'Other',
      _id: 'allowFileType06',
      isChecked: false,
    },
  ];

  functionalAreaContexts: any = [
    {
      name: 'Community',
      _id: 'functionalAreaContexts01',
      isChecked: false,
    },
    {
      name: 'Products',
      _id: 'functionalAreaContexts02',
      isChecked: false,
    },
    {
      name: 'Tools',
      _id: 'functionalAreaContexts03',
      isChecked: false,
    },
    {
      name: 'Transport',
      _id: 'functionalAreaContexts04',
      isChecked: false,
    },
    {
      name: 'Team',
      _id: 'functionalAreaContexts05',
      isChecked: false,
    },
    {
      name: 'Material',
      _id: 'functionalAreaContexts06',
      isChecked: false,
    },
    {
      name: 'Property',
      _id: 'functionalAreaContexts07',
      isChecked: false,
    },
  ];

  selectedFileId(value: any) {
    this.allowedDocumentTypes.push(value);
  }

  selectedfunctionalAreaContexts(value: any) {
    this.businessObjectContexts.push(value);
  }

  checkNameValidation(value: any) {
    if (value == '') {
      this.formNameValidation = true;
    } else {
      this.formNameValidation = false;
    }
  }

  async createDocumentType() {
    try {
      if (this.formNameValidation != true) {
        let payloadReq = {
          name: this.documentTypes.name,
          availableInBuilderMode: this.documentTypes.availableInBuilderMode,
          builderCanAdd: this.documentTypes.builderCanAdd,
          availableInVendorMode: this.documentTypes.availableInVendorMode,
          availableInSelectorMode: this.documentTypes.availableInSelectorMode,
          includedInProductCard: this.documentTypes.includedInProductCard,
          includedInHomeownerExport:
            this.documentTypes.includedInHomeownerExport,
          allowedDocumentTypes: this.allowedDocumentTypes,
          businessObjectContexts: this.businessObjectContexts,
          isActive: this.documentTypes.isActive,
          isAppendix: this.documentTypes.isAppendix,
          canExportedSeparatedPDF: this.documentTypes.canExportedSeparatedPDF,
        };
        const response = await this.apiEndpoint.createDocumentType(payloadReq);
        this.onSuccess.emit();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocumentType() {
    try {
      let payloadReq = {
        name: this.documentTypes.name,
        availableInBuilderMode: this.documentTypes.availableInBuilderMode,
        builderCanAdd: this.documentTypes.builderCanAdd,
        availableInVendorMode: this.documentTypes.availableInVendorMode,
        availableInSelectorMode: this.documentTypes.availableInSelectorMode,
        includedInProductCard: this.documentTypes.includedInProductCard,
        includedInHomeownerExport: this.documentTypes.includedInHomeownerExport,
        allowedDocumentTypes: this.documentTypes.allowedDocumentTypes,
        businessObjectContexts: this.businessObjectContexts,
        isActive: this.documentTypes.isActive,
        isAppendix: this.documentTypes.isAppendix,
        canExportedSeparatedPDF: this.documentTypes.canExportedSeparatedPDF,
      };
      const response = await this.apiEndpoint.updateDocumentType(
        payloadReq,
        this.documentTypes._id
      );
      this.onSuccess.emit();
    } catch (error) {
      console.log(error);
    }
  }

  closeModal() {
    this.onSuccess.emit();
  }

  submitForm() {
    if (this.isEdit) {
      this.updateDocumentType();
    } else {
      this.createDocumentType();
    }
  }
}
