import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { City, Country, State } from 'country-state-city';
import { ICity, ICountry, IState } from 'country-state-city/dist/lib/interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { SettingsService } from 'src/app/modules/settings/services/settings/settings.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  @Output()
  companyCreated: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  canSkip = false;

  password = '';
  timeLeft: number = 20;
  interval: any;

  needsActivation = false;
  loading = false;



  companyDetailsForm: FormGroup = this.fb.group({
    companyName: ['', Validators.required],
    surname: ['', Validators.required],
    firstName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    username: ['', Validators.required],
    companyType: [0, Validators.required],
    password: ['', Validators.required],
  })


  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private readonly settingsService: SettingsService,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService
  ) { }

  ngOnInit(): void {

    this.companyDetailsForm = this.fb.group({
      companyName: ['', Validators.required],
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      companyType: [0, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  proceedCreateCompany() {
    if (!this.companyDetailsForm.value.phoneNumber) {
      this.notificationService.publishMessage('Phone Number is required', 'danger', 0);
    } else if (this.companyDetailsForm.value.phoneNumber.length <= 10) {
      this.notificationService.publishMessage('Phone Number must be 11 digits', 'danger', 0);
    } else if (this.companyDetailsForm.value.phoneNumber.length >= 14) {
        this.notificationService.publishMessage('Phone Number must be a maximum of 14 digits', 'danger', 0);
    } else if (this.companyDetailsForm.value.password.length <= 5) {
      this.notificationService.publishMessage('Password must contain more than 5 characters', 'danger', 0);
    } else if (this.companyDetailsForm.value.password !== this.companyDetailsForm.value.confirmPassword) {
      this.notificationService.publishMessage('Password and Confirm Password must be same', 'danger', 0);
    } else {
      this.createCompany();
    }
  }

  createCompany() {
    this.loading = true;
    const data = {
      ...this.companyDetailsForm.value
    }
    this.settingsService.createCompany(this.companyDetailsForm.value)
    .subscribe(
      (res: any) => {
        this.loading = false;
        if(res['success']) {
          this.needsActivation = true;
          this.notificationService.publishMessage('Account created successfully', 'success', 0);
          // this.startTimer();
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  get phoneRegex() {
    return /[0-9]/
  }


}
