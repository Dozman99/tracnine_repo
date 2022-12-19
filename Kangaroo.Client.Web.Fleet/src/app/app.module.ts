import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeaderInterceptor} from "./modules/core/interceptors/header.interceptor";
import {ErrorInterceptor} from "./modules/core/interceptors/error.interceptor";
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { AngularFireAuthModule, } from '@angular/fire/compat/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivateEmailComponent } from './activate-email/activate-email.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivateEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps_API,
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgMultiSelectDropDownModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: BUCKET, useValue: environment.firebaseConfig.storageBucket }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
