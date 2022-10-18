import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiEndpointService } from '../api-endpoint.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-create-edit-tenant-user',
  templateUrl: './create-edit-tenant-user.component.html',
  styleUrls: ['./create-edit-tenant-user.component.css'],
})
export class CreateEditTenantUserComponent implements OnInit {
  constructor(
    private apiEndpoint: ApiEndpointService,
    private modalService: BsModalService
  ) {}

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter();

  modalRef?: BsModalRef;
  tenantUserSignUp: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    tenant_name: '',
    fullName: '',
    role: '',
  };
  checkPasswordValidation: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  ngOnInit(): void {}

  async tenantSignUp() {
    try {
      if (this.checkPasswordValidation != true) {
        let payloadReq: any = {
          first_name: this.tenantUserSignUp.first_name,
          last_name: this.tenantUserSignUp.last_name,
          email: this.tenantUserSignUp.email,
          password: this.tenantUserSignUp.password,
          confirm_password: this.tenantUserSignUp.confirm_password,
          fullName:
            this.tenantUserSignUp.first_name +
            ' ' +
            this.tenantUserSignUp.last_name,
          tenant_name: this.tenantUserSignUp.tenant_name,
          role: 'Designer',
        };

        let response = await this.apiEndpoint.createTenantUser(payloadReq);
        this.cancelModal();
      }
    } catch (error) {
      console.log(error);
      this.modalRef = this.modalService.show(ErrorModalComponent, {
        initialState: {
          error: error,
        },
        class: 'modal-dialog modal-sm modal-dialog-centered error-modal',
        ignoreBackdropClick: true,
      });
      this.modalRef?.content.closeEmmitter.subscribe((value: any) => {
        this.modalRef?.hide();
      });
    }
  }

  checkPassword() {
    if (
      this.tenantUserSignUp.password != this.tenantUserSignUp.confirm_password
    ) {
      this.checkPasswordValidation = true;
    } else {
      this.checkPasswordValidation = false;
    }
  }

  showPasswordButton() {
    this.showPassword = !this.showPassword;
  }

  showConfirmPasswordButton() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  cancelModal() {
    this.onSuccess.emit();
  }
}
