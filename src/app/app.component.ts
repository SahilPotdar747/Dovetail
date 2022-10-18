import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from './api-endpoint.service';
import { ComponentCommunicationService } from './component-communication.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dovetail_CRUD';
  isProfileOptionsOpen: boolean = true;
  currentUserData: any = '';
  constructor(
    private router: Router,
    private componentCommunicationService: ComponentCommunicationService
  ) {
    this.componentCommunicationService.node$.subscribe((e: any) => {
      if (e != null) {
        if (e.componentName == 'login-component') {
          this.currentUserData = e.data;
        }
      }
    });
  }

  ngOnInit(): void {
    this.currentUserData = localStorage.getItem('login_details');
  }

  collapseSidebar() {
    $('#sidebar,#routeContent').hasClass('sidebar-collapsed')
      ? $('#sidebar,#routeContent,.hamburger').removeClass('sidebar-collapsed')
      : $('#sidebar,#routeContent,.hamburger').addClass('sidebar-collapsed');
  }

  logout() {
    sessionStorage.clear();
    this.isProfileOptionsOpen = true;
    this.router.navigateByUrl('/login');
  }
}
