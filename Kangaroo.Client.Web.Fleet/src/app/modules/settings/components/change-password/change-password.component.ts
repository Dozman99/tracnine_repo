import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { JwtHelperService } from '@auth0/angular-jwt';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly onboardService: OnboardService,
    private readonly notificationService: NotificationService
    ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  send() {
    this.loading = true;
    const token = localStorage.getItem('access_token');
    const userCredentials: any = JSON.parse(localStorage.getItem('userCredentials') || '');
    const data = {
      username: userCredentials['user']['providerData'][0]['uid'],
      token,
      password: this.changePasswordForm.value.newPassword,
      type: 'string'
    }
    this.onboardService.resetPassword(data)
    .subscribe(
    (res: any) => {
      this.loading = false;
      if(res['success']) {
        this.changePasswordForm.reset();
        this.notificationService.publishMessage(res['messages'], 'success', 0);
      } else {
        this.notificationService.publishMessage(res['messages'], 'danger', 0);
      }
    }
    )
  }

}
