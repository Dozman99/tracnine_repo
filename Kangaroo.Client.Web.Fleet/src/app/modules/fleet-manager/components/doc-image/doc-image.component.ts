import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-doc-image',
  templateUrl: './doc-image.component.html',
  styleUrls: ['./doc-image.component.scss']
})
export class DocImageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: {
      fileUrl: string
    },
  ) { }

  ngOnInit(): void {
  }

}
