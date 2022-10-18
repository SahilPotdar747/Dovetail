import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditRoomtypesComponent } from './create-edit-roomtypes/create-edit-roomtypes.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { ExportPresetsComponent } from './export-presets/export-presets.component';
import { FieldsComponent } from './fields/fields.component';
import { LoginComponent } from './login/login.component';
import { PhasesComponent } from './phases/phases.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { SectionComponent } from './section/section.component';
import { TenantUserComponent } from './tenant-user/tenant-user.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'product-types',
    component: ProductTypesComponent,
  },
  {
    path: 'fields',
    component: FieldsComponent,
  },
  {
    path: 'export-preset',
    component: ExportPresetsComponent,
  },
  {
    path: 'phases',
    component: PhasesComponent,
  },
  {
    path: 'room-types',
    component: RoomTypesComponent,
  },
  {
    path: 'section',
    component: SectionComponent,
  },
  {
    path: 'document-types',
    component: DocumentTypesComponent,
  },
  {
    path: 'users',
    component: UserManagementComponent,
  },
  {
    path: 'tenant-users',
    component: TenantUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
