import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CanLeaveCurrentDeliveryProcess} from "../models/can-leave-current-delivery-process/can-leave-current-delivery-process";
import {CanLeavePageNotificationComponent} from "../../shared/components/can-leave-page-notification/can-leave-page-notification.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CanProceedNextGuard implements CanDeactivate<CanLeaveCurrentDeliveryProcess> {

  constructor(private matDialog: MatDialog) {}

  canDeactivate(
    component: CanLeaveCurrentDeliveryProcess,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!component.canLeave()) {
      return this.matDialog.open(
        CanLeavePageNotificationComponent, {
          width: 'auto',
          height: 'auto'
        }
      ).afterClosed();
    } else {
      return component.canLeave();
    }
  }

}
