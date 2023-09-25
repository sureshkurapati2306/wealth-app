import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '@cimb/core';
import { FundListComponent } from './fund-list.component';
import { of } from 'rxjs';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

const mockObj = {
  "maximum_initial_subscription_amount_str": "999,999,999,999.00",
  "close_date": "17 Mar 2022",
  "three_month_ind": "DOWN",
  "switch_indicator": "Y",
  "fund_document": [
    {
      "msId": 10724,
      "fundCode": "BHL17D",
      "msLink": "F000000AP0",
      "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1",
      "isActive": "Y",
      "docId": 1,
      "startDate": "2021-07-01T00:00:00",
      "endDate": null,
      "createdBy": null,
      "modifiedBy": null,
      "createdDate": null,
      "documentName": "Master Prospectus",
      "modifiedDate": "2021-12-31T16:40:01"
    },
    {
      "msId": 10725,
      "fundCode": "BHL17D",
      "msLink": "F000000AP0",
      "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1",
      "isActive": "Y",
      "docId": 77,
      "startDate": "2021-07-01T00:00:00",
      "endDate": null,
      "createdBy": null,
      "modifiedBy": null,
      "createdDate": null,
      "documentName": "Product Highlight Sheet",
      "modifiedDate": "2021-12-31T16:40:01"
    },
    {
      "msId": 10726,
      "fundCode": "BHL17D",
      "msLink": "F000000AP0",
      "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=4&investmenttype=1",
      "isActive": "Y",
      "docId": 4,
      "startDate": "2021-08-31T00:00:00",
      "endDate": null,
      "createdBy": null,
      "modifiedBy": null,
      "createdDate": null,
      "documentName": "Annual Report",
      "modifiedDate": "2021-12-31T16:40:01"
    },
    {
      "msId": 10727,
      "fundCode": "BHL17D",
      "msLink": "F000000AP0",
      "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=5&investmenttype=1",
      "isActive": "Y",
      "docId": 5,
      "startDate": "2021-02-28T00:00:00",
      "endDate": null,
      "createdBy": null,
      "modifiedBy": null,
      "createdDate": null,
      "documentName": "Semi-Annual Report",
      "modifiedDate": "2021-12-31T16:40:01"
    },
    {
      "msId": 10728,
      "fundCode": "BHL17D",
      "msLink": "F000000AP0",
      "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=52&investmenttype=1",
      "isActive": "Y",
      "docId": 52,
      "startDate": "2021-10-31T00:00:00",
      "endDate": null,
      "createdBy": null,
      "modifiedBy": null,
      "createdDate": null,
      "documentName": "Fact sheet",
      "modifiedDate": "2021-12-31T16:40:01"
    }
  ],
  "fund_code": "BHL17D",
  "risk_rating": "1",
  "minimum_initial_subscription_amount": 2000,
  "maximum_subsequent_subscription_amount": 999999999999,
  "manager_code": "BHL",
  "classHexa": "#567DCC",
  "minimum_initial_subscription_amount_str": "2,000.00",
  "class_name": "FIXED INCOME",
  "min_holding": 1000,
  "minimum_subsequent_subscription_amount_str": "500.00",
  "current_holding": "Y",
  "min_redem_amt": 500,
  "fund_status": "I",
  "class_seq": 2,
  "maximum_initial_subscription_amount": 999999999999,
  "fund_name": "Cimb Islamic Sukuk Fund",
  "one_month_ind": "DOWN",
  "fund_indicator": "I",
  "esg_fund": "Y",
  "recommended": 50,
  "manager_name": "Cimb-Principal Asset Management Berhad",
  "three_month": "-3.01",
  "one_month": "-0.43",
  "max_redem_amt": 999999999999,
  "fund_risk_rating": "N",
  "maximum_subsequent_subscription_amount_str": "999,999,999,999.00",
  "nav_price": 1.2863,
  "min_switch_amt": 500,
  "risk_name": "Defensive",
  "product_category": "FIX_ INCOME ",
  "minimum_subsequent_subscription_amount": 500,
  "totalInvestment": 10000
};


describe('FundListComponent', () => {
  let component: FundListComponent;
  let fixture: ComponentFixture<FundListComponent>;
  let bottomSheet: any;
  let service: EventService;
  let loader: HarnessLoader;
  let unitsInput: MatInputHarness;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      declarations: [ FundListComponent ],
      providers: [
        MatBottomSheet,
        DecimalPipe,
        FormBuilder,
        {
            provide: EventService,
            useValue: {
                onReceived: jest.fn(),
                onAddItem: jest.fn(),
            },
        },
        provideMockStore({ initialState: mockObj }),
    ],
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FundListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.inputHasValue = true;

    service = TestBed.inject(EventService);
    bottomSheet = TestBed.inject(MatBottomSheet);
    fixture.detectChanges();

    unitsInput = await loader.getHarness(MatInputHarness.with({selector: '.custom-input'}));

  });

  it('should create on a success path', () => {
    expect(component).toBeTruthy();
  });

  it('checks for an existing value to be formatted', async () => {
    await unitsInput.focus(); // test input
    await unitsInput.blur(); // test blur
    await unitsInput.setValue('10,000.00');  //test input zero
    expect(component.formatExistingValue(100000)).toBeUndefined();
  });


  it('check if input has a value', () => {
    const hasValue = true;
    component.hasValue = true;
    if(hasValue) {
      component.hasValue = true;
      component.isAmountRemoved = false;
      component.isAmountEdited = true;
      expect(component.hasValue).toEqual(hasValue);
      expect(component.onInput()).toBeUndefined();
    }
    
  })
  
  it('check if input has no value', () => {
    const hasValue = false;
    component.hasValue = false;
    if(hasValue) {
      expect(component.hasValue).toEqual(hasValue);
      expect(component.onInput()).toBeUndefined();
    }
    
  });


  it('checks for user input', async () => {
    await unitsInput.focus(); // test input
    await unitsInput.blur(); // test blur
    await unitsInput.setValue('0.00');  //test input zero

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('1,300.12');  //test input accepted units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('0');  //test input below min units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('1,300,000.12');  //test input above max units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('0100.1');  //test input with weird formatting

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('.1');  //test input with weird formatting
    
    await unitsInput.blur(); // test blur
    await unitsInput.setValue(null);  //test input with null

    await unitsInput.blur()


    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('select a row', () => {
    const fund_name = 'ABC';
    expect(component.onSelectRow(fund_name)).toBeUndefined();
  })

  it('onDialogRefClose click', () => {
    const result = "Yes, clear cart and continue";
    const values = { index: 1, productForm: {value : "1,111.11"} };

    expect(component.onDialogRefClose(result,values)).toBeUndefined();
  });
  describe('onAddItem()', () => {
    it('Should add item if addedToCart is true', () => {
        const mockResponse = { index: 1, addedToCart: true };
        const spyCopmponent = jest.spyOn(component, 'onAddItem');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        component.cartUTAccount  = 'A80105957';
        component.selectedAccounts  = 'Dummy123';

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onAddItem(mockObj, 1);

        service.onReceived().subscribe((result) => {
            expect(component.hasValue).toBeTruthy();
            expect(result).toEqual(mockResponse);
        });

        fixture.detectChanges()

        expect(spyCopmponent).toHaveBeenCalled();
    });

    it('Should not add item if addedToCart is false', () => {
        const mockResponse = {addedToCart: false };
        const spyCopmponent = jest.spyOn(component, 'onAddItem');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onAddItem(mockObj, 1);

        expect(component.productForm).toBeDefined();
        expect(spyCopmponent).toHaveBeenCalled();
    });
  });

  describe('onUpdateCart()', () => {
    it('Should update item if updateCart is true', () => {
        const mockResponse = { index: 1, updateCart: true };
        const spyCopmponent = jest.spyOn(component, 'onUpdateCart');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onUpdateCart(mockObj);

        service.onReceived().subscribe((result) => {
            expect(result).toEqual(mockResponse);
        });

        expect(spyCopmponent).toHaveBeenCalled();
    });
    it('Should not update item if updateCart value is false', () => {
        const mockResponse = { index: 1, updateCart: false };
        const spyCopmponent = jest.spyOn(component, 'onUpdateCart');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onUpdateCart(mockObj);
        expect(component.productForm).toBeDefined();
        expect(spyCopmponent).toHaveBeenCalled();
    });
  });

  describe('onRemovedItem()', () => {
    it('Should remove item removedCart is true', () => {
        const mockResponse = { index: 1, removedCart: true };
        const spyCopmponent = jest.spyOn(component, 'onRemovedItem');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onRemovedItem(mockObj, 1);

        service.onReceived().subscribe((result) => {
            expect(result).toEqual(mockResponse);
        });

        expect(spyCopmponent).toHaveBeenCalled();
    });
    it('Should not remove item removedCart is false', () => {
        const mockResponse = { index: 1, removedCart: false };
        const spyCopmponent = jest.spyOn(component, 'onRemovedItem');
        jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

        const mockObj = {
            controls: 'VALUE',
            errors: null,
            pristine: true,
            status: 'VALID',
        };
        component.onRemovedItem(mockObj, 1);

        expect(component.productForm).toBeDefined();
        expect(spyCopmponent).toHaveBeenCalled();
    });
  });
  describe('openNavBottomSheet()', () => {
    it('Should open tool tips', () => {
        bottomSheet.open = jest.fn();
        component.openNavBottomSheet();
        expect(bottomSheet.open).toBeCalledTimes(1);

        expect(bottomSheet.open).toHaveBeenCalledWith(component.toolTipNavPrice, {
            panelClass: 'tooltip-action-sheet',
        });
    });
  });

  describe('openFundHolidayBottomSheet()', () => {
      it('Should open tool tips', () => {
          bottomSheet.open = jest.fn();
          component.openFundHolidayBottomSheet();
          expect(bottomSheet.open).toBeCalledTimes(1);

          expect(bottomSheet.open).toHaveBeenCalledWith(component.toolTipFH, {
              panelClass: 'tooltip-action-sheet',
          });
      });
  });


  it('should format a number to thousand with separator', () => {
    const input = component.productForm.controls.investmentAmount;
    expect(component.callThousandCommaSeperatorAndTwoDecimal(input)).toBeUndefined();
  });

  it('checks for min amount entered', () => {
    const testNum = 1;
    expect(component.ValidateMinAmount(testNum)).toBeTruthy()
  })

  it('acceptNumbersOnly ', () => {
    const event = { charCode: 51, which: 51 };
    expect(component.acceptNumbersOnly(event)).toBeTruthy();
  });

  it('validates if it exceeds min amount ', () => {
    const amount = 1000000;
    expect(component.amountMinExceed(amount)).toBeTruthy();
  });

  it('redirects to fund detail page', () => {
    const fund = { fund_code: 'BHL17D' };
    component.fund = mockObj;

    expect(component.showDetailPage(fund)).toBeUndefined();
  });

  it('checks if input has value before applying a number format', () => {
    fixture.componentInstance;
    component.hasValue = true;
    fixture.detectChanges();
    expect(component.applyNumberFormatting(100)).toBeTruthy()
  })
});
