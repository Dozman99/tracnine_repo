import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDriverDocsComponent } from './add-driver-docs.component';

describe('AddDriverDocsComponent', () => {
  let component: AddDriverDocsComponent;
  let fixture: ComponentFixture<AddDriverDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDriverDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDriverDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
