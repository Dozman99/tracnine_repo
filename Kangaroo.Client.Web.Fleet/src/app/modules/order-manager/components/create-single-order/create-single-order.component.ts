import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-single-order',
  templateUrl: './create-single-order.component.html',
  styleUrls: ['./create-single-order.component.scss']
})
export class CreateSingleOrderComponent implements OnInit {
  orderDetailsForm: FormGroup;
  selectedOption: any;

  constructor(
    private readonly fb: FormBuilder
  ) { 
    this.orderDetailsForm = this.fb.group({
      senderFirstName: ['', Validators.required],
      senderLastName: ['', Validators.required],
      senderEmail: ['', Validators.required],
      senderPhoneNumber: ['', Validators.required],
      recieverName: ['', Validators.required],
      recieverPhoneNumber: ['', Validators.required],
      recieverNote: [''],
    })
  }

  ngOnInit(): void {
  }

  select(selection: any) {
    this.selectedOption = selection;
  }

}
