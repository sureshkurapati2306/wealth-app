import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintMultiSelectCheckboxComponent } from './mint-multi-select-checkbox.component';

describe('MintMultiSelectCheckboxComponent', () => {
  let component: MintMultiSelectCheckboxComponent;
  let fixture: ComponentFixture<MintMultiSelectCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintMultiSelectCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintMultiSelectCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
