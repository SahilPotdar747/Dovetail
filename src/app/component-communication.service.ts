import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentCommunicationService {
  constructor(private modalService: BsModalService) {}

  private node = new BehaviorSubject(null);
  private modalPermissions = new BehaviorSubject('');
  get node$() {
    return this.node.asObservable();
  }

  modalRef?: BsModalRef;
  // modal permissions check
  modalPermissionsFunction(data: string) {
    this.modalPermissions.next(data);
  }
  getModalPermissionsType() {
    let data;
    this.modalPermissions.subscribe((res) => {
      data = res;
    });

    return data;
  }

  addNode(data: any) {
    this.node.next(data);
  }

  public showLoader() {
    $('#dovetailLoader').show();
  }

  public closeLoader() {
    $('#dovetailLoader').hide();
  }

  popUp(content: string) {
    const initialState = {
      error: content,
    };

    this.modalRef = this.modalService.show(ErrorModalComponent, {
      initialState,
      class: 'modal-dialog modal-md modal-dialog-centered error-modal',
      ignoreBackdropClick: true,
    });
    this.modalRef?.content.closeEmmitter.subscribe((value: any) => {
      this.modalRef?.hide();
    });
  }
}
