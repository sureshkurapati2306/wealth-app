import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintMultiSelectChipComponent } from './mint-multi-select-chip.component';

describe('MintMultiSelectChipComponent', () => {
  let component: MintMultiSelectChipComponent;
  let fixture: ComponentFixture<MintMultiSelectChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintMultiSelectChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintMultiSelectChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
