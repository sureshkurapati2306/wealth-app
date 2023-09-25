import { User } from '../../model/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../state/reducers';
import * as CartActions from '../../state/cart/cart.actions';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DialogAlertComponent } from '@cimb/mint';
import { MatDialog } from '@angular/material/dialog';
import { CartList, Fund, PurchaseDetail, CartSummary } from '@cimb/shared/models';
import { DashbordService } from '../dashbord-service/dashbord.service';
import { Router } from '@angular/router';
import { EventService } from '@cimb/core';
import { path } from '../../../shared/config';
import { getFundDetail } from '../../../modules/available-funds/+state/available-funds.selectors';
import { uploadFundDetailSuccess } from '../../../modules/available-funds/+state/available-funds.actions';
import { Store as CartState } from '../../../core/state/cart/cart.reducer';
import { Store as UserState } from '../../../core/state/user/user.reducer';
import { AnalyticService } from '@cimb/shared/services';
@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {

  clientID: string;
  clientID$ = this.store.select('clicks').subscribe((clicks) => {
    this.clientID = clicks.customerIDNumber;
  });
  constructor(
    private store: Store<fromStore.AppState>,
    private decimalPipe: DecimalPipe,
    public dialog: MatDialog,
    private dashboardService: DashbordService,
    private _eventService: EventService,
    private router: Router,
    private analyticService: AnalyticService
  ) {

    //Get purchase data from dashboardReducer for use in add to cart validation
    this.dashbordReducersSubscription = this.store.select('dashbordReducers').subscribe((data) => {
      if (Array.isArray(data?.purchaseDetailData)) {
        this.purchaseDetailDataFromStore = data.purchaseDetailData;
      }
    });

    this.fullRedemptionPopUp();
  }

  dashbordUserData: User;
  cartData: any;
  private purchaseDetailDataFromStore: PurchaseDetail[] = [];
  private dashbordReducersSubscription: Subscription;

  cartList: CartList;
  fundDetailData: Fund;
  fundDetailSubscription: Subscription;
  fundCartData: CartState;
  userData: UserState;
  /***
   * Call's create, update  and switch cart apis based on params
   *
   * data - cart reduder full data and new fund details
   * callSwithApi - same params for switch so reuseing it if true switch api will be called
   */
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  callAddToCart(data: any, callSwithApi: boolean = false) {

    if (this.checkIfFullSwitchOutRequestProcessing(data)) {
      //unable to transact
      return false;
    }
    const cartData = data.cartData;
    const cimbStaff = data.cimbStaff ? data.cimbStaff : 1;
    const fundObj = data.fundObj;

    const fundList = cartData?.fundList ? cartData.fundList : [];
    const clientId = this.clientID;
    const unit = parseFloat(data.unit);
    let total_redemption_units = 0;
    let total_redemption_amount = 0.0;

    let totalSwitchOutUnits = 0;
    let totalSwitchOutAmount = 0.0;
    let totalSwitchInUnits = 0;

    let totalSwitchInAmount = 0.0;
    let flow = null;
    let totalInvestment = 0.00;
    const amount = parseFloat(data.amount);

    if (data.flow === '001') {

      flow = '01';
    } else if (data.flow === '002') {

      flow = '02';
      total_redemption_units = cartData.total_redemption_units + unit;
      total_redemption_amount = cartData.total_redemption_amount + amount;
    } else if (data.flow === '003') {

      flow = '03';
      totalSwitchOutUnits = cartData.total_switch_out_units + unit;
      totalSwitchOutAmount = cartData.total_switch_out_amount + amount;
      totalSwitchInUnits = cartData.total_switch_in_units;
      totalSwitchInAmount = cartData.total_switch_in_amount;
    }

    const salesCharge = 0.0;
    const salesChargeAmount = 0.0;
    const cardNetAmount = 0.0;

    const fundListParam = [];
    if (!callSwithApi) {
      if (fundList && fundList.length >= 1) {
        for (const k of Object.keys(fundList)) {
          const item = fundList[k];
          const value = {
            txnType: flow,
            totalRedem:
              flow === '02' && item && item.card_redemption_units ? item.card_redemption_units : 0.00,

            totalSwitchOut:
              flow === '03' && item && item.totalSwitchOut ? item.totalSwitchOut : 0.00,
            switchOutAmount: flow === '03' && item && item.switchOutAmount ? item.switchOutAmount : 0.00,


            salesStatus: 'Y',
            chargeId: item?.charge_id ? item.charge_id : 0,
            taxId: item?.tax_id ? item.tax_id : 0,
            taxCode: item?.tax_code ? item.tax_code : 0,

            toFundCode: item?.toFundCode ? item.toFundCode : '',

            totalNetAmount: flow === '01' || flow === '03' ? item.card_net_amount : 0.0,
            totalSalesCharges: flow === '01' ? item.card_sale_charge : 0.0,

            switchSalesCharges: flow === '03' && item && item.switchSalesCharges ? item.switchSalesCharges : 0,
            taxRate: item?.tax_rate ? item.tax_rate : 0,
            totalSwitchIn: flow === '03' && item && item.totalSwitchIn ? item.totalSwitchIn : 0,

            switchInAmount: flow === '03' && item && item.switchInAmount ? item.switchInAmount : 0,
            taxAmount: item?.tax_amount ? item.tax_amount : 0,

            switchSalesPercentage: flow === '03' && item && item.switchSalesPercentage ? item.switchSalesPercentage : 0,
            cartDetailId: item?.cartDetailId ? item.cartDetailId : '',
            fundRiskRating: item?.fund_risk_rating,

            fundCode: item.fund_code,

            totalInvestment: this.addToCartTotalInvestment('situation1', flow, item),

            totalSalesPercentage: item?.totalSalesPercentage ? item?.totalSalesPercentage : 0.00,

            totalRedemAmount:
              flow === '02' && item && item.card_redemption_amount ? item.card_redemption_amount : 0.00,

          };
          fundListParam.push(value);
        }
      }
    }

    if (fundObj) {
      const item = fundObj;
      const value = {
        totalNetAmount: flow === '01' && cardNetAmount ? this.getRoundNumber(cardNetAmount) : 0.0,
        totalSalesCharges: flow === '01' && salesChargeAmount ? this.getRoundNumber(salesChargeAmount) : 0.0,


        switchOutAmount: flow === '03' && amount ? this.getRoundNumber(amount) : 0.0,
        totalSwitchIn: 0,


        fundCode: item.fund_code,

        totalInvestment: (flow === '01' || flow === '03' || flow === '02') && amount ? this.getRoundNumber(amount) : 0.0,

        totalRedemAmount: flow === '02' && amount ? this.getRoundNumber(amount) : 0.0,
        totalSwitchOut: flow === '03' && unit ? this.getRoundNumber(unit) : 0.00,

        switchSalesCharges: 0,
        totalSalesPercentage: flow === '01' && item?.totalSalesPercentage ? item?.totalSalesPercentage : 0.0,

        totalRedem: flow === '02' && unit ? this.getRoundNumber(unit) : 0.00,
        switchSalesPercentage: 0,

        cartDetailId: "",
        fundRiskRating: item?.fund_risk_rating,
        txnType: flow,

        salesStatus: flow === '01' || flow === '03' ? 'N' : 'Y',
        switchInAmount: 0,
        toFundCode: data?.toFundCode ? data.toFundCode : '',
      };
      fundListParam.push(value);
    }
    let totalSalesCharges = this.addToCartTotalSalesCharges('situation1', flow, cartData, salesChargeAmount);
    let totalNetAmount = this.addToCartTotalNetAmount('situation1', flow, cartData, cardNetAmount);
    if (callSwithApi) {
      totalInvestment = amount;
      totalSalesCharges = this.addToCartTotalSalesCharges('situation2', flow, cartData, salesChargeAmount);
      totalNetAmount = this.addToCartTotalNetAmount('situation2', flow, cartData, cardNetAmount);
    } else {
      totalInvestment = this.addToCartTotalInvestment('situation2', flow, '', amount, cartData);
    }
    const param = {
      cartSummary: {
        totalSwitchIn: flow === '03' ? totalSwitchInUnits : 0,
        totalFund: fundListParam ? fundListParam.length : 0,

        totalInvestment: this.addToCartTotalInvestmentSituation3(flow, totalInvestment, total_redemption_amount),
        totalNetAmount: this.getRoundNumber(totalNetAmount),


        totalSwitchOut: flow === '03' ? this.getRoundNumber(totalSwitchOutUnits) : 0.0,

        cartSummaryId: cartData?.cartSummaryId ? cartData?.cartSummaryId : '',
        staffIndicator: parseInt(cimbStaff),

        txnType: flow,
        utAccountNo: data.utAccount,
        clientId: clientId,


        totalSalesCharges: this.getRoundNumber(totalSalesCharges),
        totalRedem: flow === '02' ? this.getRoundNumber(total_redemption_units) : 0.0,

        switchOutAmount: flow === '03' ? this.getRoundNumber(totalSwitchOutAmount) : 0.0,
        totalRedemAmount: flow === '02' ? this.getRoundNumber(total_redemption_amount) : 0.0,

        switchInAmount: flow === '03' ? totalSwitchInAmount : 0,
        cartDetailList: fundListParam,

      },
    };
    if (callSwithApi) {
      this.store.dispatch(
        new CartActions.SwitchCart(
          JSON.stringify(param),
          fundObj,
          data.index,
          data.unit,
          data.amount,
          data.flow,
          false,
          data.screen,
          clientId
        )
      );
    } else {
      if (cartData?.cartSummaryId && cartData?.cartSummaryId != "-1") {
        this.store.dispatch(
          new CartActions.UpdateCartByClientId(
            data.clientId,
            JSON.stringify(param),
            fundObj,
            data.index,
            data.unit,
            data.amount,
            data.flow,
            false,
            data.screen
          )
        );
      } else {
        this.store.dispatch(
          new CartActions.CreateCart(
            JSON.stringify(param),
            fundObj,
            data.index,
            data.unit,
            data.amount,
            data.flow,
            false,
            data.screen,
            clientId
          )
        );
      }
    }
  }

  addToCartTotalInvestment(situation: string, flow: string, item: any, amount?: number, cartData?: any): number {
    if (situation === 'situation1') {
      if (flow === '01') {
        return item.card_amount;
      } else if (flow === '02') {
        return item.card_redemption_amount;
      } else if (flow === '03') {
        return item.totalInvestment;
      } else {
        return 0.0;
      }
    } else if (situation === 'situation2') {
      if (flow === '01' || flow === '03') {
        return cartData ? cartData.totalAmount + amount : 0;
      } else {
        return 0.0;
      }
    }
  }

  addToCartTotalInvestmentSituation3(flow: string, totalInvestment: number, total_redemption_amount: number): number {
    if ((flow === '01' || flow === '03') && totalInvestment) {
      return this.getRoundNumber(totalInvestment);
    } else if (flow === '02') {
      return this.getRoundNumber(total_redemption_amount);
    } else {
      return 0.0;
    }
  }

  addToCartTotalSalesCharges(situation: string, flow: string, cartData: any, salesChargeAmount: number): number {
    if (situation === 'situation1') {
      if (flow === '01') {
        return cartData ? cartData.totalSalesCharges + salesChargeAmount : 0;
      } else {
        return 0.0;
      }
    } else if (situation === 'situation2') {
      if (flow === '01') {
        return cartData ? salesChargeAmount : 0;
      } else {
        return 0.0;
      }
    }
  }

  addToCartTotalNetAmount(situation: string, flow: string, cartData: any, cardNetAmount: number): number {
    if (situation === 'situation1') {
      if (flow === '01') {
        return cartData ? cartData.totalNetInvestmentAmount + cardNetAmount : 0;
      } else {
        return 0.0;
      }
    } else if (situation === 'situation2') {
      if (flow === '01') {
        return cartData ? cardNetAmount : 0;
      } else {
        return 0.0;
      }
    }
  }

  /***
   * Called to remove a item from cart using update api
   */
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  removeFromCart(data: any, fund_code: string) {

    const cartData = data.cartData;
    const cimbStaff = data.cimbStaff ? data.cimbStaff : '1';
    let index = -1;

    index = data.index;
    let fundListFull = cartData?.fundList ? [...cartData.fundList] : [];
    if (!index || (index && index < 0)) {
      /* istanbul ignore next */  //Used to ignore the next line in spec. Dont remove this line.
      index = fundListFull.map(e => e.fund_code).indexOf(fund_code);
    }
    const fundObj = fundListFull[index];

    const clientId = this.clientID;

    const unitTrustAccount = cartData?.unitTrustAccount ? cartData.unitTrustAccount : '';
    let flow = null;

    let totalSalesCharges = cartData ? cartData.totalSalesCharges : 0.0;

    let totalNetInvestmentAmount = cartData
      ? cartData.totalNetInvestmentAmount
      : 0.0;
    let totalAmount = cartData ? cartData.totalAmount : 0.0;
    let totalRedemptionAmount = cartData ? cartData.total_redemption_amount : 0.0;

    let total_redemption_units = cartData ? cartData.total_redemption_units : 0;

    let totalSwitchOutUnits = cartData ? cartData.total_switch_out_units : 0;
    let totalSwitchInUnits = cartData ? cartData.total_switch_in_units : 0;

    let totalSwitchOutAmount = cartData ? cartData.total_switch_out_amount : 0;
    let totalSwitchInAmount = cartData ? cartData.total_switch_in_amount : 0;

    let totalFundsCount = cartData ? cartData.totalFundsCount : 0;
    const card_redemption_amount = fundObj?.card_redemption_amount ? fundObj.card_redemption_amount : 0.00;
    if (cartData) {
      if (data.flow === '001') {
        flow = '01';
        totalSalesCharges =
          cartData.totalSalesCharges - (fundObj ? fundObj.card_sale_charge : 0);
        totalNetInvestmentAmount =
          cartData.totalNetInvestmentAmount - (fundObj ? fundObj.card_net_amount : 0);

        totalAmount = cartData.totalAmount - (fundObj ? fundObj.card_amount : 0);
        totalFundsCount = cartData.totalFundsCount - 1;
      } else if (data.flow === '002') {
        flow = '02';
        total_redemption_units = cartData.total_redemption_units - (fundObj ? fundObj.card_redemption_units : 0);

        totalRedemptionAmount = totalRedemptionAmount - card_redemption_amount;
        totalFundsCount = cartData.totalFundsCount - 1;
        totalAmount = 0.00;
      } else if (data.flow === '003') {
        flow = '03';

        totalSalesCharges = cartData.totalSalesCharges - (fundObj ? fundObj.switchSalesCharges : 0);
        totalNetInvestmentAmount = cartData.totalNetInvestmentAmount - (fundObj ? fundObj.card_net_amount : 0);
        totalAmount = totalNetInvestmentAmount;

        totalSwitchOutUnits = totalSwitchOutUnits - (fundObj ? fundObj.totalSwitchOut : 0);
        totalSwitchInUnits = totalSwitchInUnits - (fundObj ? fundObj.totalSwitchIn : 0);

        totalSwitchOutAmount = totalSwitchOutAmount - (fundObj ? fundObj.switchOutAmount : 0);
        totalSwitchInAmount = totalSwitchInAmount - (fundObj ? fundObj.switchInAmount : 0);

        totalFundsCount = cartData.totalFundsCount - 1;
      }
    }

    const fundListParam = [];
    if (index > -1) {
      const tempFundList = fundListFull;
      fundListFull = tempFundList.filter((_, i) => i !== index);
    }
    if (fundListFull && fundListFull.length < 1) {
      totalRedemptionAmount = 0.00;
      total_redemption_units = 0.00;
      totalNetInvestmentAmount = 0.00;
      totalAmount = 0.00;
    }
    const fundList = [...fundListFull];
    if (fundList && fundList.length >= 1) {
      for (const k of Object.keys(fundList)) {
        const item = fundList[k];
        const value = {
          totalSalesCharges: item.card_sale_charge,

          totalRedem: item.card_redemption_units,

          switchOutAmount: item?.switchOutAmount ? item.switchOutAmount : 0,
          totalSwitchIn: item?.totalSwitchIn ? item.totalSwitchIn : 0,


          switchSalesPercentage: 0,
          cartDetailId: item?.cartDetailId ? item?.cartDetailId : '',

          taxRate: item?.tax_rate ? item.tax_rate : 0,

          toFundCode: item?.toFundCode ? item.toFundCode : '',

          fundCode: item.fund_code,
          txnType: flow,

          totalNetAmount: item.card_net_amount,

          totalRedemAmount: item?.card_redemption_amount ? item.card_redemption_amount : 0,

          totalSwitchOut: item?.totalSwitchOut ? item.totalSwitchOut : 0,

          fundRiskRating: item?.fund_risk_rating,
          salesStatus: 'Y',
          switchInAmount: item?.switchInAmount ? item.switchInAmount : 0,
          chargeId: item?.charge_id ? item.charge_id : 0,

          taxAmount: item?.tax_amount ? item.tax_amount : 0,
          switchSalesCharges: item?.switchSalesCharges ? item.switchSalesCharges : 0,
          totalSalesPercentage: item?.totalSalesPercentage ? item?.totalSalesPercentage : 0.00,
          taxId: item?.tax_id ? item.tax_id : 0,

          taxCode: item?.tax_code ? item.tax_code : 0,
          totalInvestment: flow === '01' ? item.card_amount : this.removeFromCartTotalInvestment(flow, item),

        };
        fundListParam.push(value);
      }
    }
    const param = {
      cartSummary: {
        totalSalesCharges: totalSalesCharges,
        totalRedem: flow === '02' ? total_redemption_units : 0.00,

        totalSwitchOut: flow === '03' ? totalSwitchOutUnits : 0,
        totalRedemAmount: flow === '02' ? totalRedemptionAmount : 0.00,

        switchInAmount: flow === '03' ? totalSwitchInAmount : 0,

        staffIndicator: cimbStaff,

        utAccountNo: unitTrustAccount,
        clientId: clientId,
        txnType: flow,

        totalInvestment: flow === '01' || flow === '03' ? totalAmount : totalRedemptionAmount,
        totalNetAmount: totalNetInvestmentAmount,


        switchOutAmount: flow === '03' ? totalSwitchOutAmount : 0,
        totalFund: totalFundsCount,
        totalSwitchIn: flow === '03' ? totalSwitchInUnits : 0,

        cartDetailList: fundListParam,
        cartSummaryId: cartData?.cartSummaryId ? cartData?.cartSummaryId : '',

      },
    };

    // REMOVE
    this.updateFundDetailStore(param, 'remove');
    this.store.dispatch(
      new CartActions.UpdateCartByClientId(
        clientId,
        JSON.stringify(param),
        null,
        data.index,
        data.unit,
        data.amount,
        data.flow,
        false,
        data.screen
      )
    );
  }

  removeFromCartTotalInvestment(flow: string, item: any): number {
    if (flow === '02') {
      return item.card_redemption_amount
    } else if (flow === '03') {
      return item.card_net_amount
    } else {
      return 0.00
    }
  }

  /***
   * called to update on single fund amount or unit using update api call
   */
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  updateCartItem(data: any, index: number, amount: number, unit: number) {
    const cartData = data.cartData;
    const cimbStaff = data.cimbStaff ? data.cimbStaff : 1;
    const fundListFull =
      cartData?.fundList ? [...cartData.fundList] : [];
    const fundObj = { ...fundListFull[index] };

    const clientId = this.clientID;
    const unitTrustAccount =
      cartData?.unitTrustAccount ? cartData.unitTrustAccount : '';

    let flow = null;
    let total_redemption_units = cartData ? cartData.total_redemption_units : 0;

    let totalSalesCharges = cartData ? cartData.totalSalesCharges : 0;
    let totalNetInvestmentAmount = cartData ? cartData.totalNetInvestmentAmount : 0;
    let totalAmount = cartData ? cartData.totalAmount : 0;
    const totalFundsCount = cartData ? cartData.totalFundsCount : 0;
    let totalRedemAmount = cartData ? cartData.totalRedemAmount : 0;

    let cardSaleChargePrevious = fundObj ? fundObj.card_sale_charge : 0.0;
    let cardNetChargePrevious = fundObj.card_net_amount;

    let salesCharge = fundObj.sales_charge_nonstaff;
    let salesChargeAmountNew = 0.0;
    let cardNetAmountNew = 0.0;
    let card_redemption_units = 0.0;

    let totalSwitchOutUnits = 0;
    let totalSwitchInUnits = 0;
    let totalSwitchOutAmount = 0;
    let totalSwitchInAmount = 0;

    let fundItemNew = {};
    if (data.flow === '001') {
      flow = '01';

      cardSaleChargePrevious = parseFloat(fundObj.card_sale_charge);
      cardNetChargePrevious = parseFloat(fundObj.card_net_amount);

      salesCharge = parseFloat(fundObj.sales_charges_nonstaff);
      salesChargeAmountNew = amount * (salesCharge / 100);
      cardNetAmountNew = amount - salesChargeAmountNew;

      fundItemNew = {
        ...fundListFull[index],
        card_amount: amount,
        card_net_amount: cardNetAmountNew,
        card_sale_charge: salesChargeAmountNew,
        canEdit: false,
        salesStatus: 'N',
        toFundCode: "",
      };

      totalSalesCharges =
        (parseFloat(cartData.totalSalesCharges) -
          cardSaleChargePrevious) +
        salesChargeAmountNew;
      totalNetInvestmentAmount =
        (parseFloat(cartData.totalNetInvestmentAmount) -
          cardNetChargePrevious) +
        cardNetAmountNew;
      totalAmount = (cartData.totalAmount - (fundObj ? fundObj.card_amount : 0)) + amount;

    } else if (data.flow === '002') {
      flow = '02';

      card_redemption_units = fundObj.card_redemption_units;
      const card_redemption_amount = fundObj?.card_redemption_amount ? fundObj.card_redemption_amount : 0.00;

      fundItemNew = {
        ...fundObj,
        card_redemption_units: unit,
        card_amount: amount,
        card_redemption_amount: amount,
        canEdit: false,
        salesStatus: 'N',
        toFundCode: "",
      };
      total_redemption_units = (cartData.total_redemption_units - card_redemption_units) + unit;
      totalRedemAmount = (cartData.total_redemption_amount - card_redemption_amount) + amount;
      totalAmount = 0.00;
    } else if (data.flow === '003') {
      flow = '03';

      cardSaleChargePrevious = parseFloat(fundObj.card_sale_charge);
      cardNetChargePrevious = parseFloat(fundObj.card_net_amount);

      salesCharge = parseFloat(fundObj.sales_charges_nonstaff);
      salesChargeAmountNew = amount * (salesCharge / 100);
      cardNetAmountNew = amount - salesChargeAmountNew;

      totalSalesCharges =
        (parseFloat(cartData.totalSalesCharges) -
          cardSaleChargePrevious) +
        salesChargeAmountNew;

      totalNetInvestmentAmount =
        (parseFloat(cartData.totalNetInvestmentAmount) -
          cardNetChargePrevious) +
        cardNetAmountNew;

      fundItemNew = {
        ...fundListFull[index],
        salesStatus: 'N',
        totalNetAmount: amount,
        canEdit: false,

        toFundCode: data?.toFundCode ? data.toFundCode : '',
        card_sale_charge: salesChargeAmountNew,

        totalInvestment: amount,

        totalSwitchOut: unit,

        card_net_amount: cardNetAmountNew,

        switchOutAmount: amount,
      };

      totalSwitchOutUnits = cartData.total_switch_out_units - (fundObj ? fundObj.totalSwitchOut : 0) + unit;

      totalSwitchOutAmount = cartData.total_switch_out_amount - (fundObj ? fundObj.switchOutAmount : 0) + amount;

      totalSwitchInUnits = cartData.total_switch_in_units;
      totalSwitchInAmount = cartData.total_switch_in_amount;

      totalAmount = totalSwitchOutAmount;

    }
    fundListFull[index] = { ...fundItemNew };
    const fundListParam = [];

    if (fundListFull && fundListFull.length >= 1) {
      for (const k of Object.keys(fundListFull)) {
        const item = fundListFull[k];
        const totalInvestmentElse = flow === '03' && item ? item.totalInvestment : 0;
        const totalInvestmentElseIf = flow === '02' && item && item.card_redemption_amount ? this.getRoundNumber(item.card_redemption_amount) : totalInvestmentElse;
        const value = {
          totalSalesCharges: item ? this.getRoundNumber(item.card_sale_charge) : 0,

          totalRedem: flow === '02' && item ? this.getRoundNumber(item.card_redemption_units) : 0.00,

          switchInAmount: flow === '03' && item && item.switchInAmount ? item.switchInAmount : 0,

          switchSalesPercentage: flow === '03' && item && item.switchSalesPercentage ? item.switchSalesPercentage : 0,
          cartDetailId: item?.cartDetailId ? item?.cartDetailId : '',
          fundRiskRating: item?.fund_risk_rating,

          switchOutAmount: flow === '03' && item && item.switchOutAmount ? item.switchOutAmount : 0,
          chargeId: item?.charge_id ? item.charge_id : 0,
          taxId: item?.tax_id ? item.tax_id : 0,
          totalSalesPercentage: item?.totalSalesPercentage ? item?.totalSalesPercentage : 0.00,
          salesStatus: 'Y',
          taxRate: item?.tax_rate ? item.tax_rate : 0,

          toFundCode: item?.toFundCode ? item.toFundCode : '',

          fundCode: item ? item.fund_code : null,
          switchSalesCharges: flow === '03' && item && item.switchSalesCharges ? item.switchSalesCharges : 0,
          totalInvestment: flow === '01' && item ? this.getRoundNumber(item.card_amount) : totalInvestmentElseIf,
          totalNetAmount: item ? this.getRoundNumber(item.card_net_amount) : 0,
          txnType: flow,

          totalRedemAmount: flow === '02' && item && item.card_redemption_amount ? this.getRoundNumber(item.card_redemption_amount) : 0.00,
          totalSwitchOut: flow === '03' && item && item.totalSwitchOut ? item.totalSwitchOut : 0,
          taxAmount: item?.tax_amount ? item.tax_amount : 0,
          totalSwitchIn: flow === '03' && item && item.totalSwitchIn ? item.totalSwitchIn : 0,
          taxCode: item?.tax_code ? item.tax_code : 0,

        };
        fundListParam.push(value);
      }
    }

    const totalInvestmentElse2 = flow === '02' ? this.getRoundNumber(totalRedemAmount) : 0.00;
    const param = {
      cartSummary: {
        totalRedemAmount: flow === '02' ? this.getRoundNumber(totalRedemAmount) : 0.00,

        totalSwitchOut: flow === '03' ? this.getRoundNumber(totalSwitchOutUnits) : 0.00,

        totalSwitchIn: flow === '03' ? this.getRoundNumber(totalSwitchInUnits) : 0.00,
        switchInAmount: flow === '03' ? this.getRoundNumber(totalSwitchInAmount) : 0.00,

        cartSummaryId: cartData?.cartSummaryId ? cartData?.cartSummaryId : '',
        staffIndicator: cimbStaff,

        utAccountNo: unitTrustAccount,
        clientId: clientId,
        txnType: flow,
        totalFund: totalFundsCount,

        cartDetailList: fundListParam,
        totalNetAmount: this.getRoundNumber(totalNetInvestmentAmount),
        totalSalesCharges: this.getRoundNumber(totalSalesCharges),

        totalRedem: flow === '02' ? this.getRoundNumber(total_redemption_units) : 0.00,
        switchOutAmount: flow === '03' ? this.getRoundNumber(totalSwitchOutAmount) : 0.00,
        totalInvestment: (flow === '01' || flow === '03') ? this.getRoundNumber(totalAmount) : totalInvestmentElse2,
      },
    };

    // UPDATE
    this.updateFundDetailStore(param, 'update');
    this.store.dispatch(
      new CartActions.UpdateCartByClientId(
        clientId,
        JSON.stringify(param),
        null,
        data.index,
        data.unit,
        data.amount,
        data.flow,
        false,
        data.screen
      )
    );
  }

  /***
   * Called to force recalculate tax if charge_id is empty or charge_id is null or charge_id is 0
   * salesStatus value will be set to 'N' if charge_id is empty or charge_id is null or charge_id is 0
   * only those funds tax will be recalculated in backend
   */
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  reCalculateTaxCart(data: any) {
    const cartData = data.cartData;
    const cimbStaff = data.cimbStaff ? data.cimbStaff : 1;
    const fundListFull =
      cartData?.fundList ? [...cartData.fundList] : [];

    const clientId = cartData?.clientId ? cartData.clientId : '';
    const unitTrustAccount =
      cartData?.unitTrustAccount ? cartData.unitTrustAccount : '';

    let flow = null;
    const total_redemption_units = cartData ? cartData.total_redemption_units : 0;
    const totalFundsCount = cartData ? cartData.totalFundsCount : 0;
    const totalRedemAmount = cartData ? cartData.totalRedemAmount : 0;

    const totalSalesCharges = cartData ? parseFloat(cartData.totalSalesCharges) : 0;
    const totalNetInvestmentAmount = cartData ? parseFloat(cartData.totalNetInvestmentAmount) : 0;
    const totalAmount = cartData ? parseFloat(cartData.totalAmount) : 0;
    if (data.flow === '001') {
      flow = '01';
    } else if (data.flow === '002') {
      flow = '02';
    } else if (data.flow === '003') {
      flow = '03';
    }
    const fundListParam = [];

    if (fundListFull && fundListFull.length >= 1) {
      for (const k of Object.keys(fundListFull)) {
        const item = fundListFull[k];
        const salesStatus = (!item?.charge_id || item?.charge_id === null || item?.charge_id === 0) ? 'N' : 'Y';
        const totalInvestmentElse3 = flow === '02' && item && item.card_redemption_amount ? this.getRoundNumber(item.card_redemption_amount) : 0;
        const value = {

          totalNetAmount: item ? this.getRoundNumber(item.card_net_amount) : 0,

          switchInAmount: 0,
          switchSalesCharges: 0,
          switchSalesPercentage: 0,
          cartDetailId: item?.cartDetailId ? item?.cartDetailId : '',

          fundRiskRating: item?.fund_risk_rating,
          totalInvestment: item && flow === '01' ? this.getRoundNumber(item.card_amount) : totalInvestmentElse3,
          totalRedemAmount: flow === '02' && item && item.card_redemption_amount ? this.getRoundNumber(item.card_redemption_amount) : 0.00,
          totalSwitchOut: 0,

          taxRate: item?.tax_rate ? item.tax_rate : 0,
          taxAmount: item?.tax_amount ? item.tax_amount : 0,
          salesStatus: salesStatus,
          toFundCode: "",

          totalSalesPercentage: item?.totalSalesPercentage ? item?.totalSalesPercentage : 0.00,

          txnType: flow,

          totalSalesCharges: item ? this.getRoundNumber(item.card_sale_charge) : 0,
          switchOutAmount: 0,
          totalSwitchIn: 0,
          chargeId: item?.charge_id ? item.charge_id : 0,

          taxId: item?.tax_id ? item.tax_id : 0,
          taxCode: item?.tax_code ? item.tax_code : 0,
          totalRedem: flow === '02' && item ? this.getRoundNumber(item.card_redemption_units) : 0.00,
          fundCode: item ? item.fund_code : null,


        };
        fundListParam.push(value);
      }
    }

    const totalInvestmentElse4 = flow === '02' ? this.getRoundNumber(totalRedemAmount) : 0.00;
    const param = {
      cartSummary: {
        totalInvestment: flow === '01' ? this.getRoundNumber(totalAmount) : totalInvestmentElse4,
        totalNetAmount: this.getRoundNumber(totalNetInvestmentAmount),

        totalRedemAmount: flow === '02' ? this.getRoundNumber(totalRedemAmount) : 0.00,
        totalSwitchOut: 0,

        switchInAmount: 0,
        cartDetailList: fundListParam,

        staffIndicator: cimbStaff,
        switchOutAmount: 0,
        utAccountNo: unitTrustAccount,
        clientId: clientId,

        totalSwitchIn: 0,

        txnType: flow,
        totalFund: totalFundsCount,

        totalSalesCharges: this.getRoundNumber(totalSalesCharges),
        cartSummaryId: cartData?.cartSummaryId ? cartData?.cartSummaryId : '',
        totalRedem: flow === '02' ? this.getRoundNumber(total_redemption_units) : 0.00,

      },
    };

    this.store.dispatch(
      new CartActions.UpdateCartByClientId(
        clientId,
        JSON.stringify(param),
        null,
        data.index,
        data.unit,
        data.amount,
        data.flow,
        false,
        data.screen
      )
    );
  }

  /***
   * Called to Round number to two decimal points
   */
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  getRoundNumber(num: number): number {
    const amount = this.decimalPipe.transform(num, '1.2-2') ?? 0.00;
    const amountNoComma = amount ? parseFloat(amount.toString().replace(/,/g, '')) : 0.00;
    return parseFloat(amountNoComma.toFixed(2));
  }

  /**
   * Check if the transacted fund exists in purchaseDetailDataFromStore and whether it is a full switch out request still in processing status. If yes, block any purchase/redeem/switch transaction for the time being. If not, can transact as usual.
   */
  checkIfFullSwitchOutRequestProcessing(data: any): boolean {

    const purchaseDetail = this.purchaseDetailDataFromStore.find(item => {
      return item.fundCode === data.fundObj.fund_code
        && item.transactionType === '03'
        && item.transactionUnit === data.fundObj.units_held_number
        && item.transactionStatus === 'Processing';
    });

    if (purchaseDetail) {
      //unable to transact
      this.dialogUnableToTransactDueToFullSwitchOut();
      return true;
    }

    //ok to transact
    return false;

  }

  dialogUnableToTransactDueToFullSwitchOut() {
    this._eventService.onClearDataonError({ fullRedeemPopUp: true });
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-danger"></em>',
        dialogHeading: 'Unable to Transact',
        dialogContent:
          '<p>We are currently processing your <strong>full switch out</strong> request for this fund. It usually takes up to 3 working days to process your request. Note that no further transaction can be performed.</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Close',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'View Transaction History',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'View Transaction History') {
        this.dashboardService.setDashboardTab(1);   //if already on Dashboard page, set the active tab via this service
        this.router.navigate(['/dashboard', { 'tab': 1 }]);   //if from other page, redirect to Dashboard page and set the active tab
      } else {
        this._eventService.onSend({ fullSwitch: true });
      }
    });
  }

  dialogUnableToTransactDueToFullReedeem() {
    this._eventService.onClearDataonError({ fullRedeemPopUp: true });
    const dialogRef2 = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-danger"></em>',
        dialogHeading: 'Unable to Transact',
        dialogContent:
          '<p>We are currently processing your <strong>full redemption</strong> request for this fund. It usually takes up to 3 working days to process your request. Note that no further transaction can be performed.</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Close',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'View Transaction History',
      },
    });
    this.analyticService.loadPopUpAnalytics('Unable to Transact');

    dialogRef2.afterClosed().subscribe((result) => {
      if (result === 'View Transaction History') {
        this.dashboardService.setDashboardTab(1);   //if already on Dashboard page, set the active tab via this service
        this.router.navigate([path.DASHBOARD, { 'tab': 1 }]);   //if from other page, redirect to Dashboard page and set the active tab
      }
    });
  }

  fullRedemptionPopUp() {
    this._eventService.onReceived()?.subscribe(data => {
      const { fullRedeemPopUp } = data;
      if (fullRedeemPopUp) {
        this.dialogUnableToTransactDueToFullReedeem();
      }
    });
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  updateFundDetailStore(param: CartSummary, action: string) {
    const { cartSummary } = param;
    const { cartDetailList } = cartSummary;

    cartDetailList.forEach(cartDtList => {
      this.cartList = {
        cart_net_amount: cartDtList.totalNetAmount,
        cart_redem_amount: cartDtList.totalRedem,
        cart_sales_charges: cartDtList.totalSalesCharges,
        cart_sales_percentage: cartDtList.totalSalesPercentage,
        cart_switch_in_amount: cartDtList.switchInAmount,
        cart_switch_out_amount: cartDtList.switchOutAmount,
        cart_switch_sales_charges: cartDtList.switchSalesCharges,
        cart_switch_sales_percentage: cartDtList.switch_sales_percentage,
        cart_total_investment: cartDtList.totalInvestment,
        cart_total_redem: cartDtList.totalRedem,
        cart_total_switch_in: cartDtList.totalSwitchIn,
        cart_total_switch_out: cartDtList.totalSwitchOut,
        cart_txn_type: cartDtList.txnType,
        fund_risk_rating: cartDtList.fundRiskRating,
        to_fund_class_name: cartDtList.asset_class,
        to_fund_code: cartDtList.toFundCode,
        to_fund_indicator: '',
        to_product_category: '',
        to_risk_name: '',
        to_risk_rating: '',
      }
    })

    this.fundDetailSubscription = this.store.select(getFundDetail).subscribe(fundDetail => {
      this.fundDetailData = fundDetail;
    })

    if (this.fundDetailData && action === 'update') {
      const newCartList = this.fundDetailData?.cart_list ? [...this.fundDetailData.cart_list] : [];
      newCartList.splice(0)
      newCartList.push(this.cartList)

      this.fundDetailData = { ...this.fundDetailData, cart_list: newCartList };

      this.store.dispatch(
        uploadFundDetailSuccess({ fundDetail: this.fundDetailData }),
      );
    }

    if (this.fundDetailData?.cart_list && action === 'remove') {
      const newCartList = this.fundDetailData?.cart_list ? [...this.fundDetailData.cart_list] : [];
      newCartList.splice(0)

      this.fundDetailData = { ...this.fundDetailData, cart_list: [] };

      this.store.dispatch(
        uploadFundDetailSuccess({ fundDetail: this.fundDetailData }),
      );
    }
  }

  refreshDataFundDetails(fundData: CartState, userData: UserState) {
    this.fundCartData = fundData;
    const flow = this.fundCartData?.txnType;
    const totalInvestmentElse5 = flow === '02' ? this.getRoundNumber(this.fundCartData?.total_redemption_amount) : 0.00;
    const param = {
      cartSummary: {
        totalRedemAmount: flow === '02' ? this.getRoundNumber(this.fundCartData?.total_redemption_amount) : 0.00,

        totalSwitchOut: flow === '03' ? this.getRoundNumber(this.fundCartData?.total_switch_in_units) : 0.00,

        totalSwitchIn: flow === '03' ? this.getRoundNumber(this.fundCartData?.total_switch_in_units) : 0.00,
        switchInAmount: flow === '03' ? this.getRoundNumber(this.fundCartData?.total_switch_in_amount) : 0.00,

        cartSummaryId: this.fundCartData?.cartSummaryId ? this.fundCartData?.cartSummaryId : '',
        staffIndicator: userData ? userData.user.cimb_staff : 1,

        utAccountNo: this.fundCartData?.unitTrustAccount,
        clientId: this.clientID,
        txnType: this.fundCartData?.txnType,
        totalFund: this.fundCartData?.totalFundsCount,

        cartDetailList: this.fundCartData?.fundList,
        totalNetAmount: this.getRoundNumber(this.fundCartData?.totalNetInvestmentAmount),
        totalSalesCharges: this.getRoundNumber(this.fundCartData?.totalSalesCharges),

        totalRedem: flow === '02' ? this.getRoundNumber(this.fundCartData?.total_redemption_units) : 0.00,
        switchOutAmount: flow === '03' ? this.getRoundNumber(this.fundCartData?.total_switch_out_amount) : 0.00,
        totalInvestment: (flow === '01' || flow === '03') ? this.getRoundNumber(this.fundCartData?.totalAmount) : totalInvestmentElse5,

      },
    };
    if (this.fundCartData?.fundList) {
      this.updateFundDetailStore(param, 'update');
    }
  }

  ngOnDestroy() {
    this.dashbordReducersSubscription?.unsubscribe();
    this.fundDetailSubscription?.unsubscribe();
  }
}
