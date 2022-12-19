import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-can-leave-page-notification',
  templateUrl: './can-leave-page-notification.component.html',
  styleUrls: ['./can-leave-page-notification.component.scss']
})
export class CanLeavePageNotificationComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<CanLeavePageNotificationComponent>) { }

  ngOnInit(): void {}

  shouldLeave(canLeave: Boolean) {
    if (canLeave) { localStorage.clear(); }
    this.matDialogRef.close(canLeave);
  }
}
