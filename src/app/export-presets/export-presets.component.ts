import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentCommunicationService } from '../component-communication.service';
import { CreateNewExportPresetComponent } from '../create-new-export-preset/create-new-export-preset.component';

@Component({
  selector: 'app-export-presets',
  templateUrl: './export-presets.component.html',
  styleUrls: ['./export-presets.component.css'],
})
export class ExportPresetsComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  modalRef?: BsModalRef;

  selectedAll: any = [];
  searchValue = '';
  filteredData: any;
  ngOnInit(): void {
    this.filteredData = this.exportPreset;
  }

  exportPreset = [
    {
      id: 1,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 2,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 3,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 4,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 5,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 6,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 7,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 8,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 9,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 10,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 11,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 12,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 13,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 14,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 15,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 16,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 17,
      productCategory_name: 'Appliances by Product Category',
    },
    {
      id: 18,
      productCategory_name: 'Appliances by Product Category',
    },
  ];

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateNewExportPresetComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  editExportPresetModal() {
    this.modalRef = this.modalService.show(CreateNewExportPresetComponent, {
      initialState: {
        isEdit: true,
      },
      class: 'modal-dialog modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.content.closeModalEmitter.subscribe((value: any) => {
      this.modalRef?.hide();
    });
  }

  searchExportPerset() {
    if (this.searchValue != null) {
      const search = this.exportPreset.filter((e: any) =>
        e?.productCategory_name
          .toLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
      this.filteredData = search;
    } else {
      this.filteredData = this.exportPreset;
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

  selectAllCheckbox(event: any) {
    if (event.target.checked) {
      this.selectedAll = this.exportPreset;
      $('input:checkbox').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('input:checkbox').prop('checked', false);
    }
  }
}
