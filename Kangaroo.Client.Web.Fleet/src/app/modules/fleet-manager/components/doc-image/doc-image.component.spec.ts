import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocImageComponent } from './doc-image.component';

describe('DocImageComponent', () => {
  let component: DocImageComponent;
  let fixture: ComponentFixture<DocImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
