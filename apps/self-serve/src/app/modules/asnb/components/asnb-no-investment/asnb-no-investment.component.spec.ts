import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbNoInvestmentComponent } from './asnb-no-investment.component';

describe('AsnbNoInvestmentComponent', () => {
  let component: AsnbNoInvestmentComponent;
  let fixture: ComponentFixture<AsnbNoInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbNoInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbNoInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
