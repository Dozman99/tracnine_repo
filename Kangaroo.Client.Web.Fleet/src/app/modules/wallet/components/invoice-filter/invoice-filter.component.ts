import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.scss']
})
export class InvoiceFilterComponent implements OnInit {

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      delivered: [false],
      enroute: [false]
    })
  }

  ngOnInit(): void {
  }

}
