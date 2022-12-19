import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns = ['FirstName', 'LastName', 'Role', 'DateAdded'];
  dataSource = [
    {
      role: 'Admin',
      firstName: 'John',
      lastName: 'Doe',
      dateAdded: new Date()
    },
    {
      role: 'Admin',
      firstName: 'John',
      lastName: 'Doe',
      dateAdded: new Date()
    },
    {
      role: 'Admin',
      firstName: 'John',
      lastName: 'Doe',
      dateAdded: new Date()
    },
    {
      role: 'Admin',
      firstName: 'John',
      lastName: 'Doe',
      dateAdded: new Date()
    },
    {
      role: 'Admin',
      firstName: 'John',
      lastName: 'Doe',
      dateAdded: new Date()
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
