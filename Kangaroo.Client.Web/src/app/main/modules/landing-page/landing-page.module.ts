import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {GooglePlaceModule} from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    AgmCoreModule,
    GooglePlaceModule,
    ReactiveFormsModule
  ]
})
export class LandingPageModule { }
