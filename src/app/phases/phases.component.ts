import { Component, OnInit } from '@angular/core';
import { event } from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateNewPhaseComponent } from '../create-new-phase/create-new-phase.component';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css'],
})
export class PhasesComponent implements OnInit {
  isChecked: any;
  constructor(private modalService: BsModalService) {}

  modalRef?: BsModalRef;
  selectedAll: any = [];
  searchValue = '';
  filteredData: any;
  ngOnInit(): void {
    this.filteredData = this.phases;
  }

  phases = [
    {
      id: 1,
      short_name: 'Builder Approval',
      phase_name: 'Builder Approval',
      type: 'On Going',
      isChecked: false
    },
    {
      id: 2,
      short_name: 'Change Order Phase',
      phase_name: 'Change Order Phase',
      type: 'Completed',
      isChecked: false
    },
    {
      id: 3,
      short_name: 'Design Final',
      phase_name: 'Design Final',
      type: 'Not Started',
      isChecked: false
    },
    {
     
      id: 4,
      short_name: 'Builder Approval',
      phase_name: 'Builder Approval',
      type: 'On Going',
      isChecked: false
    },
    {
      id: 5,
      short_name: 'Green Light Phase',
      phase_name: 'Green Light Phase',
      type: 'Not Started',
      isChecked: false
    },
    {
      
      id: 6,
      short_name: 'Builder Approval',
      phase_name: 'Builder Approval',
      type: 'On Going',
      isChecked: false
    },
    {
      id: 7,
      short_name: 'Green Light Phase',
      phase_name: 'Green Light Phase',
      type: 'Not Started',
      isChecked: false
    },
    {
      id: 8,
      short_name: 'Change Order Phase',
      phase_name: 'Change Order Phase',
      type: 'Completed',
      isChecked: false
    },
   
  ];

  openCreateNewModal() {
    this.modalRef = this.modalService.show(CreateNewPhaseComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    this.closeModal();
  }

  editPhasesModal() {
    this.modalRef = this.modalService.show(CreateNewPhaseComponent, {
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

  searchPhase() {
    if (this.searchValue != null) {
      const search = this.phases.filter((e: any) =>
        e?.short_name
          .toLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
      this.filteredData = search;
    } else {
      this.filteredData = this.phases;
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
      this.selectedAll = this.phases;
      $('input:checkbox').prop('checked', true);
    } else if (!event.target.checked) {
      this.selectedAll = [];
      $('input:checkbox').prop('checked', false);
    }
  }
}
