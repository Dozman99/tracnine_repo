import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../../services/settings/settings.service';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
  detailsMenu = [
    {code:"1",name:'Edit Company'},
    /* {code:"2",name:'Activate Company'},
    {code:"3",name:'Deactivate Company'},
    {code:"4",name:'Restore Company'},
    {code:"5",name:'Archive Company'}, */
    {code:"6",name:'Delete Company'},
  ]

  constructor(
    private readonly matDialog: MatDialog,
    public readonly settingService: SettingsService,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService
  ) { }

  ngOnInit(): void {
  }

  editComapny() {
    const openedModal = this.settingService.openEditModal();

    openedModal.afterClosed()
    .subscribe(
      res => {
        if(res) {
          this.settingService.getCompanyById$.next(true);
        }
      }
    )
  }

  deactivateCompany() {
    this.settingService.deactivateCompany(environment.companyId)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  restoreCompany() {
    this.settingService.restoreCompany('1')
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  archiveCompany() {
    this.settingService.archiveCompany(environment.companyId)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  deleteCompany() {
    this.settingService.deleteCompany(environment.companyId)
    .subscribe(
      (deletedCompanyResponse: any) => {
        if(deletedCompanyResponse['success']) {
          this.notificationService.publishMessage(deletedCompanyResponse['messages'], 'success', 0);
        } else {
          this.notificationService.publishMessage(deletedCompanyResponse['messages'], 'danger', 0);
        }
      }
    )
  }

  activateCompany() {
    this.settingService.activateCompany(environment.companyId)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  action(event: any) {
    switch(event) {
      case '1':
        this.editComapny();
        break;
      case '2':
        this.activateCompany();
        break;
      case '3':
        this.deactivateCompany();
        break;
      case '4':
        this.restoreCompany();
        break;
      case '5':
        this.archiveCompany();
        break;
      case '6':
        this.deleteCompany();
        break;
      default:
        null
    }
  }

}
