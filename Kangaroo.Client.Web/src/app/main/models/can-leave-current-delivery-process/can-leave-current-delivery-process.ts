import {Observable} from "rxjs";

export interface CanLeaveCurrentDeliveryProcess {
  canLeaveThisComponent: boolean;
  canLeave: () => Observable<boolean> | Promise<boolean> | boolean;
}
