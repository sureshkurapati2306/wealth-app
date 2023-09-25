import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbFundSectionComponent } from './asnb-fund-section.component';

describe('AsnbFundSectionComponent', () => {
  let component: AsnbFundSectionComponent;
  let fixture: ComponentFixture<AsnbFundSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbFundSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbFundSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
