import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, DeliveryTrackerRoutingModule } from './delivery-tracker-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DeliveryTrackerRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class DeliveryTrackerModule { }
