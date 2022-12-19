import { Component, Input, OnInit } from '@angular/core';
import { ICompanyDetails } from 'src/app/modules/core/interfaces/company/company-details';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {
  @Input()
  companyDetails!: ICompanyDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
