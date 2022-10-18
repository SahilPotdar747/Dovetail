import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private apiEndpoint: ApiEndpointService,
    private router: Router,
    private componentCommunicationService: ComponentCommunicationService
  ) {}
  userLogin = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  async submitLogin() {
    try {
      let rqData = {
        email: this.userLogin.email,
        password: this.userLogin.password,
      };

      const loginResponse: any = await this.apiEndpoint.login(rqData);

      localStorage.setItem('auth_token', loginResponse.token);
      const userResponse: any = await this.apiEndpoint.getUser();

      userResponse.forEach((ele: any) => {
        if (ele.email == this.userLogin.email) {
          this.componentCommunicationService.addNode({
            componentName: 'login-component',
            data: ele.name,
          });
          localStorage.setItem('login_details', ele.name);
        }
      });

      sessionStorage.setItem(
        'current_user_details',
        JSON.stringify(userResponse)
      );
      this.router.navigateByUrl('/product-types');
    } catch (error) {
      console.log(error);
    }
  }
}
