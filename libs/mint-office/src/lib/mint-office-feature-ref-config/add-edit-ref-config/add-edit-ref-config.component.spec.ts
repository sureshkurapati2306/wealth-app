import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRefConfigComponent } from './add-edit-ref-config.component';

describe('AddEditRefConfigComponent', () => {
  let component: AddEditRefConfigComponent;
  let fixture: ComponentFixture<AddEditRefConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRefConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRefConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
