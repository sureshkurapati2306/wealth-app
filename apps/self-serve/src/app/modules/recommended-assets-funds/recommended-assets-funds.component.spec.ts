import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RecommendedAssetsFundsComponent } from './recommended-assets-funds.component';

describe('RecommendedAssetsFundsComponent', () => {
  let component: RecommendedAssetsFundsComponent;
  let fixture: ComponentFixture<RecommendedAssetsFundsComponent>;
  let store: MockStore;
  const initialState = {
  totalAmount: 0.0,
  totalNetInvestmentAmount: 0.0,
  totalSalesCharges: 0.0,
  totalFundsCount: 0,
  higherRiskFundCategory: 0,
  fundList: [],
  accountName: '',
  unitTrustAccount: '',
  paymentAccount: '',
  referenceNumber: '',
  transactionSuccessStatus: false,
  transactionStatusName: '',
  transactionStatus: '',
  transactionStatusText: '',
  transactionDate: '',
  transactionWorkingDays: '',
  flow: '',
  flow_text: null,
  total_redemption_units: 0,
  total_redemption_amount: 0,

  total_switch_out_units: 0,
  total_switch_in_units: 0,
  otpResponse: null,
  otpResponseMessage: null,
  otpResponseReferenceNumber: null,
  verifyResponse: null,
  verifyResponseMessage: null,
  verifyResponseReferenceNumber: null,

  postAllTransactionResponse:null,

  cartFooterToggle:true
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
          provideMockStore({ initialState }),
      ],
      declarations: [RecommendedAssetsFundsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAssetsFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
