import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { CompanyInformationComponent } from './components/company-information/company-information.component';
import { SettingMenuComponent } from './components/setting-menu/setting-menu.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { RootComponent } from './shared/components/root/root.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { UserAndRoleComponent } from './components/user-and-role/user-and-role.component';
import {MatTableModule} from "@angular/material/table";
import {MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    SecuritySettingsComponent,
    CompanyInformationComponent,
    SettingMenuComponent,
    ProfileInformationComponent,
    RootComponent,
    UserAndRoleComponent,
    ChangePasswordComponent,
    EditCompanyComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatMenuModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule
  ]
})
export class SettingsModule { }
