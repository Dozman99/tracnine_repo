import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { OnboardService } from '../modules/onboard/services/onboard.service';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss']
})
export class ActivateEmailComponent implements OnInit {
  accountIsActivated = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly onboardService: OnboardService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      res => {
        const token = res['id'];
        console.log(token);
        this.activateAccount(token);
      }
    )
  }

  activateAccount(token: string) {
    this.onboardService.activateAccount(token)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.accountIsActivated = true;
          setTimeout(
            () => {
              this.router.navigate(['/auth/login']);
            }, 4000)
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

}
