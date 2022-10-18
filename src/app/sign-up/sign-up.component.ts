import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private apiEndpoint: ApiEndpointService,
    private router: Router
  ) {}

  userRegister: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  checkPasswordValidation: boolean = false;
  ngOnInit(): void {}

  async submitSignUp() {
    if (this.checkPasswordValidation != true) {
      try {
        let payloadReq = {
          name: this.userRegister.firstName + ' ' + this.userRegister.lastName,
          email: this.userRegister.email,
          password: this.userRegister.password,
          confirm_password: this.userRegister.confirm_password,
        };
        const response = await this.apiEndpoint.signUp(payloadReq);
        this.router.navigateByUrl('/login');
      } catch (error) {
        console.log(error);
      }
    }
  }

  checkPassword() {
    if (this.userRegister.password != this.userRegister.confirm_password) {
      this.checkPasswordValidation = true;
    } else {
      this.checkPasswordValidation = false;
    }
  }
}
