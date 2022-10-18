import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-create-edit-user-modal',
  templateUrl: './create-edit-user-modal.component.html',
  styleUrls: ['./create-edit-user-modal.component.css'],
})
export class CreateEditUserModalComponent implements OnInit {
  constructor(
    private apiEndpoint: ApiEndpointService,
    private componentCommunicationService: ComponentCommunicationService
  ) {}
  @Input()
  isEdit: boolean = false;

  @Input()
  userData: boolean = false;

  checkPasswordValidation: boolean = false;
  modalRef?: BsModalRef;
  @Output()
  closeModalEmitter: EventEmitter<any> = new EventEmitter();

  patternnum = CreateEditUserModalComponent.PATTERNS.number;
  static PATTERNS = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    number: /^[0-9]*$/,
  };

  userModal: any = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: '',
  };

  ngOnInit(): void {
    if (this.isEdit) {
      this.userModal = this.userData;
    }
  }

  async createUser() {
    if (this.checkPasswordValidation != true) {
      try {
        let payloadReq = {
          name: this.userModal.name,
          email: this.userModal.email,
          password: this.userModal.password,
          confirm_password: this.userModal.confirm_password,
          role: 'Administrator',
        };
        const response = await this.apiEndpoint.createAdminUser(payloadReq);
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  numbersOnlyValidator(event: any) {
    const pattern = this.patternnum;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, '');
    }
  }

  async updateUser() {
    try {
      let payloadReq = {
        name: this.userModal.name,
        email: this.userModal.email,
        password: this.userModal.password,
        confirm_password: this.userModal.confirm_password,
        role: this.userModal.role,
        id: this.userModal._id ? this.userModal._id : null,
      };
      let response = await this.apiEndpoint.updateAdminUser(
        payloadReq,
        this.userModal._id
      );
      this.closeModalEmitter.emit();
    } catch (error) {
      console.log(error);
    }
  }

  checkPassword() {
    if (this.userModal.password != this.userModal.confirm_password) {
      this.checkPasswordValidation = true;
    } else {
      this.checkPasswordValidation = false;
    }
  }
}
