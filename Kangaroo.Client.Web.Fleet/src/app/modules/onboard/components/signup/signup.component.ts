import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/modules/settings/services/settings/settings.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { OnboardService } from '../../services/onboard.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = '';
  registrationForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
    surname: ['', Validators.required],
    firstName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    identityType: ['', Validators.required],
    identityId: ['', Validators.required],
  })
  companyDetailsForm: FormGroup = this.fb.group({
    comapnyName: ['', Validators.required],
    rcNumber: ['', Validators.required],
    tin: ['', Validators.required],
  })
  showCompanyDetails = true;

  constructor(
    private router: Router,
    private readonly onboardService: OnboardService,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly settingsService: SettingsService
  ) { 
    
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      identityType: ['', Validators.required],
      identityId: ['', Validators.required],
    })
  }

  get confirmedPassword() {return this.registrationForm.get('password'); }

  signUp() {
    this.registrationForm.value.phoneNumber = '+234' + this.registrationForm.value.phoneNumber;
    this.onboardService.register(this.registrationForm.value)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.sendOTP();
          this.notificationService.publishMessage('Account created successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
    
  }
  
  sendOTP() {
    this.onboardService.sendOTP(this.registrationForm.value.username)
    .subscribe(
      (res: any) => {
        console.log(res)
        if(res['success']) {
          this.showCompanyDetails = true;
          this.notificationService.publishMessage('Accont created successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  skipCOmpanyDetails() {
    this.showCompanyDetails = true;
    this.router.navigate(['/main'])
  }

  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

}
