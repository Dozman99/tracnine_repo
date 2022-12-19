import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { OnboardService } from '../../onboard/services/onboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private readonly onboardService: OnboardService) {
    const token = localStorage.getItem('access_token') || '';
    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);
      environment.companyId = decodedToken.orgd;
    }
  }

  ngOnInit(): void {
    const menu_toggle = document.querySelector('.menu-toggle');
    const mobile_nav = document.querySelector('.mobile-nav');
    menu_toggle?.addEventListener('click', () => {
      menu_toggle?.classList.toggle('isActive');
      // sidebar?.classList.toggle('isActive');
      mobile_nav?.classList.toggle('isActive');
    })
  }

  close() {
    document.querySelector('.menu-toggle')?.classList.toggle('isActive');
    document.querySelector('.mobile-nav')?.classList.toggle('isActive');
  }

  logOut() {
    this.onboardService.logout();
  }

}
