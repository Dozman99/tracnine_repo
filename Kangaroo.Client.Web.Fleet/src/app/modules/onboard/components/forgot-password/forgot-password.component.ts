import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OnboardService} from "../../services/onboard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutePath} from "../../../shared/models/route-path";
import {first} from "rxjs/operators";
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  error = '';

  // @ts-ignore
  ForgotPasswordForm: FormGroup;
  private returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private readonly onboardService: OnboardService,
    private readonly afAuth: AngularFireAuth,
    private readonly notificationService: NotificationService
  ) {
    // if (this.onboardService.currentUserValue) {
    //   this.router.navigate([RoutePath.OVERVIEW]);
    // }
  }

  ngOnInit(): void {
    this.ForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || RoutePath.OVERVIEW;
  }

  // convenience getter for easy access to form fields
  // get f(): any { return this.ForgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ForgotPasswordForm.invalid) {
      return;
    }

    this.forgot();
  }

  forgot() {
    this.onboardService.resetPassword(this.ForgotPasswordForm.value).subscribe(
      (res: any) => {
        if(res['success']) {
          // this.activationSuccess = true;
          // this.accountIsActivated = true;
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        } else {
          // this.startTimer();
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  /** forgot(): void {
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(this.ForgotPasswordForm.value.email, this.ForgotPasswordForm.value.password)
    .then(
      data => {
        data.user?.getIdToken().then(token => {
          this.loading = false;
          localStorage.setItem('access_token', token);
          localStorage.setItem('userCredentials', JSON.stringify(data));
          const decodedToken = new JwtHelperService().decodeToken(token);
          environment.companyId = decodedToken.orgd;
          this.router.navigate(['/main/fleet-manager']);
        })
      }
    )
    .catch(
      err => {
        this.loading = false;
        switch(err['code']) {
          case 'auth/user-not-found':
            this.notificationService.publishMessage('User not found', 'danger', 0);
            break;
          case 'auth/user-disabled': {
            this.notificationService.publishMessage('User is disabled', 'danger', 0);
            break;
          }
          case 'auth/wrong-password': {
            this.notificationService.publishMessage('Invalid password', 'danger', 0);
            break;
          }
          case 'auth/invalid-email': {
            this.notificationService.publishMessage('Invalid email', 'danger', 0);
            break;
          }
          default: {
            this.notificationService.publishMessage('Login error. Try again later', 'danger', 0);
        }
        }
      }
    )
  }  */



  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
}

