import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Setting, SettingsUid } from '@cimb/shared/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from '../../../core/state/reducers';
import * as WealthDashboardSelectors from '../../../../../../../apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';
@Component({
  selector: 'cimb-fund-detail-component-loader-section-content',
  templateUrl: './fund-detail-component-loader-section-content.component.html',
  styleUrls: ['./fund-detail-component-loader-section-content.component.scss']
})
export class FundDetailComponentLoaderSectionContentComponent  implements OnInit, OnDestroy{

    @Input() price;
    @Input() isFundHoliday;
    @Input() past1Mnth;
    @Input() past3Mnth;
    @Input() assetType;
    @Input() salesCharge;
    @Input() compliance;
    @Input() selectedFundId;
    @Input() disclaimer;
    @Input() selectedFund;
    @Input() documentNames;
    @Output() documentDownloadEmitter: EventEmitter<any> = new EventEmitter();
    @Input() r2Enabled;

    @Output() addToCart : EventEmitter<any> = new EventEmitter();
    @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
    @Output() removeFromCart : EventEmitter<any> = new EventEmitter();
    @Output() updateAmountInCart : EventEmitter<any> = new EventEmitter();
    @Output() updateAmountInCartRedeem : EventEmitter<any> = new EventEmitter();

    cartObservable: Observable<any>;
    carstSubscription: Subscription;
    totalFundsCount = 0;

    userObservable :Observable<any>;
    userSubscription : Subscription;
    userData;

    @Input() cartUTAccount;
    @Input() cartFundCount;
    @Input() selectedAccounts;
    @Input() cartAmount;
    @Input() solePropIndicator;
    @Input() currentHolding;
    @Input() userType;

    // Settings Data
  settingsData: Setting[];

  // Uid For Settings
  addToCartForPurchaseSettingUid: string = SettingsUid.ADD_TO_CART_AT_FUND_DETAIL_PAGE_FOR_PURCHASE;
  addToCartForTopUpSettingUid: string = SettingsUid.ADD_TO_CART_AT_FUND_DETAIL_PAGE_FOR_TOPUP;
  addToCartForRedeemTnx: string = SettingsUid.REDEEM_TRANSACTION_AT_CART;
  addToCartForSwitchTnx: string = SettingsUid.SWITCH_TRANSACTION_AT_CART;
  enableRedeemAtFundDetailSettingUid: string = SettingsUid.REDEEM_AT_FUND_DETAILS;
  switchAtFundDetailsSettingsUid: string = SettingsUid.SWITCH_AT_FUND_DETAILS

  // Booleans for Settings
  enableAddToCartForPurchase = true;
  enableAddToCartForTopup = true;
  enableAddToCartInRedeemTnx = true;
  enableAddToCartInSwitchTnx = true;
  enableRedeemAtFundDetail = true;
  enableSwitchAtFundDetails = true;

    csId = -1;
    cartData: any;
    flowText = null;
    flowCart = null;
    userReducer: any;
    foreignerInd = 'N';
    occupationInd = 'N';
    closeDate: string;

    constructor(
        private store: Store<fromStore.AppState>,
    ) {}
    ngOnDestroy(): void {
        if(this.carstSubscription){
          this.carstSubscription.unsubscribe();
        }
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
    ngOnInit(): void {
        this.getNdSetSettings();
        this.cartObservable = this.store.select('cartReducer');

        this.carstSubscription = this.cartObservable.subscribe((data) => {
            this.closeDate = (this.selectedFund) ? this.selectedFund?.close_date : data.fundList[0]?.close_date;
            this.cartData = data;
            this.csId = data.csId;
            this.flowText = data.flow_text;
            this.flowCart = data.flow;
            this.totalFundsCount = data.totalFundsCount;
            this.cartUTAccount = data.unitTrustAccount;
        });

        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userReducer = users;
            this.userData = users.user;

            this.foreignerInd = users.foreignerInd;
            this.occupationInd = users.occupationInd;
        });
        this.currentHolding = this.selectedFund?.current_holding ?? 'N';

        const updatedSelectedFund = {
          ...this.selectedFund,
          nav_price_number: JSON.parse(this.selectedFund?.nav_price || "null")
        };
        this.selectedFund = updatedSelectedFund;
    }

    getNdSetSettings(): void {
      this.store.select(WealthDashboardSelectors.settingsDataSuccess).subscribe((resp) => {
        if(resp) {
          this.settingsData = resp;
          if(this.settingsData) {
            this.settingsData.forEach((settingData: Setting) => {
              
              const isEnabled = settingData.enabled;
              const settingUid = settingData.utSettingId;

              if (settingUid === this.addToCartForPurchaseSettingUid) {
                this.enableAddToCartForPurchase = isEnabled;
              }
  
              if (settingUid === this.addToCartForTopUpSettingUid) {
                this.enableAddToCartForTopup = isEnabled;
              }
  
              if (settingUid === this.addToCartForRedeemTnx) {
                this.enableAddToCartInRedeemTnx = isEnabled;
              }
  
              if (settingUid === this.addToCartForSwitchTnx) {
                this.enableAddToCartInSwitchTnx = isEnabled;
              }

              if (settingUid === this.enableRedeemAtFundDetailSettingUid) {
                this.enableRedeemAtFundDetail = isEnabled;
              }
              if (settingUid === this.switchAtFundDetailsSettingsUid) {
                this.enableSwitchAtFundDetails = isEnabled;
              }
              
            })
          }
        }
      })
    }

  documentDownload(documentName) {
    this.documentDownloadEmitter.emit(documentName)
  }

  addToCartEvent(values) {
    this.addToCart.emit(values);
  }

  removeFromCartEvent(values) {
    this.removeFromCart.emit(values);
  }

  updateAmountInCartEvent(values) {
    this.updateAmountInCart.emit(values);
  }

  clearAndAddNewToCartEvent(values) {
    this.clearAndAddNewToCart.emit(values);
  }
  
  updateAmountInRedeemCartEvent(values) {
    this.updateAmountInCartRedeem.emit(values);
  }

}
