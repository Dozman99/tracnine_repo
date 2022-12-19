import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, DeliveryTypeRoutingModule } from './delivery-type-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    DeliveryTypeRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ]
})
export class DeliveryTypeModule { }
