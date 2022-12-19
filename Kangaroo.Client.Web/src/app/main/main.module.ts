import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {CanProceedNextGuard} from "./guards/can-proceed-next.guard";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [CanProceedNextGuard]
})
export class MainModule { }
