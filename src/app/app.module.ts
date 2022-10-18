import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { FieldsComponent } from './fields/fields.component';
import { ExportPresetsComponent } from './export-presets/export-presets.component';
import { PhasesComponent } from './phases/phases.component';
import { SectionComponent } from './section/section.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateNewExportPresetComponent } from './create-new-export-preset/create-new-export-preset.component';
import { FormsModule } from '@angular/forms';
import { CreateNewPhaseComponent } from './create-new-phase/create-new-phase.component';
import { CreateEditSectionComponent } from './create-edit-section/create-edit-section.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { CreateEditDocumentComponent } from './create-edit-document/create-edit-document.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateEditUserModalComponent } from './create-edit-user-modal/create-edit-user-modal.component';
import { CreateEditFieldsComponent } from './create-edit-fields/create-edit-fields.component';
import { CreateEditProducttypesComponent } from './create-edit-producttypes/create-edit-producttypes.component';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { CreateEditRoomtypesComponent } from './create-edit-roomtypes/create-edit-roomtypes.component';
import { ApiEndpointService } from './api-endpoint.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { CreateEditTenantUserComponent } from './create-edit-tenant-user/create-edit-tenant-user.component';
import { TenantUserComponent } from './tenant-user/tenant-user.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { HttpInterceptorService } from './http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductTypesComponent,
    RoomTypesComponent,
    DocumentTypesComponent,
    FieldsComponent,
    ExportPresetsComponent,
    PhasesComponent,
    SectionComponent,
    CreateNewExportPresetComponent,
    CreateNewPhaseComponent,
    CreateEditSectionComponent,
    DocumentUploadComponent,
    CreateEditDocumentComponent,
    LoginComponent,
    UserManagementComponent,
    CreateEditUserModalComponent,
    CreateEditFieldsComponent,
    CreateEditProducttypesComponent,
    CreateEditRoomtypesComponent,
    CreateEditTenantUserComponent,
    TenantUserComponent,
    ErrorModalComponent,
  ],
  imports: [
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    SortableModule.forRoot(),
    DragDropModule,
    PaginationModule.forRoot(),
    CommonModule,
  ],

  providers: [
    ApiEndpointService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
