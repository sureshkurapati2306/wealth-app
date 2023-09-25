import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLoanCardsComponent } from './box-loan-cards.component';

describe('BoxLoanCardsComponent', () => {
  let component: BoxLoanCardsComponent;
  let fixture: ComponentFixture<BoxLoanCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxLoanCardsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxLoanCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.liabilitiesDetails=[{
      name:"My Loans / Financing",
      donutColor:"#567dcc",
      myliability:[{
        "accountName":"HomeFlexi Smart",
        "accountNo":"10 0306851 354",
        "investmentValue":"Total Outstanding Balance",
        "dateTime":" Last updated on 13 Nov 202111:21:45 am",
        "nextPay":"Next Payment Due: 01 Apr 2021",
        "amount":"10,000.00",
        "top":"MYR",
      },
      
      {
        "accountName":"Auto Finance",
        "accountNo":"10 0306851 354",
        "investmentValue":"Total Outstanding Balance",
        "dateTime":" Last updated on 13 Nov 202111:21:45 am",
        "nextPay":"Next Payment Due: 01 Apr 2021",
        "amount":"10,000.00",
        "top":"MYR",
      },
      {
        "accountName":"Cash Plus Personal Loan",
        "accountNo":"10 0306851 354",
        "investmentValue":"Total Outstanding Balance",
        "dateTime":" Last updated on 13 Nov 202111:21:45 am",
        "nextPay":"Next Payment Due: 01 Apr 2021",
        "amount":"10,000.00",
        "top":"MYR",
      },
    ]
     

    },
    {
      name:"My Credit Cards",
      donutColor:"#86A2DA",
      myliability:[{
        "accountName":"Platinum Mastercard",
        "accountNo":"10 0306851 354",
        "investmentValue":"Total Outstanding Balance",
        "dateTime":" Last updated on 13 Nov 202111:21:45 am",
        "amount":"10,000.00",
        "top":"MYR",
      }
    ]
    }]
    expect(component).toBeTruthy();
  });
});
