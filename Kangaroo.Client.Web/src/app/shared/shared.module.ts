import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PackageCategoryModalComponent } from './components/package-category-modal/package-category-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PackageItemModalComponent } from './components/package-item-modal/package-item-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { CanLeavePageNotificationComponent } from './components/can-leave-page-notification/can-leave-page-notification.component';

@NgModule({
  declarations: [
    PackageCategoryModalComponent,
    PackageItemModalComponent,
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    OrderCompleteComponent,
    CanLeavePageNotificationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
