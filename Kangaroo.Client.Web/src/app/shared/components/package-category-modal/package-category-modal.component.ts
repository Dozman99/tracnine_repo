import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCategoryInterface } from 'src/app/core/types/item-category';

@Component({
  selector: 'app-package-category-modal',
  templateUrl: './package-category-modal.component.html',
  styleUrls: ['./package-category-modal.component.scss']
})
export class PackageCategoryModalComponent implements OnInit {
  /* productCategories = [
    {id: 1, name:'Food'},
    {id: 2, name:'Clothing'},
    {id: 3, name:'Shoes'},
    {id: 4, name:'Electronics'},
    {id: 5, name:'Jewelries'},
    {id: 6, name:'Accessories'},
    {id: 7, name:'Documents'}
  ] */

  constructor(
    private matDialogRef: MatDialogRef<PackageCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productCategories: ItemCategoryInterface[]
  ) { }

  ngOnInit(): void {
  }

  selectItem(product: any) {
    this.matDialogRef.close(product);
  }

}
