import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
