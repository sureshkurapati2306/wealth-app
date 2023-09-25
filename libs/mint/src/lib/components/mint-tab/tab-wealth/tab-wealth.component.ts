import { Store } from '@ngrx/store';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { AccountSummary, WealthPortfolioBox } from '@cimb/shared/models';
import { getDayOfWeek } from './../../../utils/date/date.util';
import { setOccuranceAndAnalyticsData } from './../../../utils/analytics/adobe-analytics.utils';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';
import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';

@Component({
    selector: 'cimb-tab-wealth',
    templateUrl: './tab-wealth.component.html',
    styleUrls: ['./tab-wealth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabWealthComponent {
    @Input() selectedTabIndex = 0;
    @Input() customerType: string;
    @Output() tabChangeEvent: EventEmitter<any> = new EventEmitter();
    @Output() openRiskProfileEvent: EventEmitter<any> = new EventEmitter();
    @ViewChild('tabGroup') tabGroup;
    @Input() canNavigateToDashboard = false;
    @Input() enableApplyNowAtMyInvestmentDAshboard = false;

    @Input() hasASNBDowntime = false;

    tabClickCount = 0;

    _accountSummary: AccountSummary;
    assetSummary = [];
    liabilitiesSummary = [];
    assetDetails: WealthPortfolioBox[] = [];
    liabilitiesDetails: WealthPortfolioBox[] = [];
    donutColorAssets = ['#36b37e', '#72caa5'];
    donutColorLiabilities = ['#567dcc', '#86A2DA'];
    currentCustomerType = 'ETP';

    @Input() isOnScheduledMaintenance = false;

    @Input() maintenanceStartTime: string;
    @Input() maintenanceEndTime: string;
    @Input() maintenanceStartDate: any;
    @Input() maintenanceEndDate: any;

    @Input() set accountSummary(data: AccountSummary) {
        this._accountSummary = data;

        // donut chart Assets data for mobile view
        this.assetSummary = [
            {
                element: [
                    {
                        name: 'My Investment',
                        value: this._accountSummary.myInvestmentPct,
                    },
                    {
                        name: 'My Money',
                        value: this._accountSummary.myDepositPct,
                    },
                ],
            },
        ];

        // donut chart Liabilities data for mobile view
        this.liabilitiesSummary = [
            {
                element: [
                    {
                        name: 'My Loans / Financing',
                        value: this._accountSummary.myLoansPct,
                    },
                    // {
                    //   name: "My Credit Cards", value: this._accountSummary.myCreditCardsPct > 0 ? this._accountSummary.myCreditCardsPct : 0
                    // }
                ],
            },
        ];

        // entries for Assets
        const investmentStatus =
            this._accountSummary.utInvestmentsStatus === 'Success' ? true : false;
        const depositStatus =
            this._accountSummary.tdaStatus === 'Success' ||
            this._accountSummary.sibsStatus === 'Success'
                ? true
                : false;
        const casaAvailability = this._accountSummary.assetLiabilities.filter(
            (item) => item.alCategory === 'Assets' && item.alcName === 'My Deposit',
        );
        this.assetDetails = [
            {
                name: 'My Investment',
                donutColor: '#36b37e',
                items: this._accountSummary.assetLiabilities.filter(
                    (item) => item.alCategory === 'Assets' && item.alcName === 'My Investment',
                ),
                status: investmentStatus,
                casaAvailability: casaAvailability.length !== 0 ? true : false,
                haveActiveCasa:
                    casaAvailability.filter((item) => item.accountStatus === 'Active').length !== 0
                        ? true
                        : false,
            },
            {
                name: 'My Deposit/Investment',
                donutColor: '#72caa5',
                items: this._accountSummary.assetLiabilities.filter(
                    (item) => item.alCategory === 'Assets' && item.alcName === 'My Deposit',
                ),
                // add "&& item.alCode !== 'TDA'" to exclude fixed deposit accounts
                status: depositStatus,
                casaAvailability: casaAvailability.length !== 0 ? true : false,
                haveActiveCasa:
                    casaAvailability.filter((item) => item.accountStatus === 'Active').length !== 0
                        ? true
                        : false,
            },
        ];

        // entries for Liabilities
        const loanFinancingStatus = this._accountSummary.sibsStatus === 'Success' ? true : false;
        // const creditCardStatus = this._accountSummary.cardLinkStatus === "Success"
        //   || this._accountSummary.islamicCreditCardStatus === "Success" ? true : false
        this.liabilitiesDetails = [
            {
                name: 'My Loans / Financing',
                donutColor: '#567dcc',
                items: this._accountSummary.assetLiabilities.filter(
                    (item) =>
                        item.alCategory === 'Liabilities' && item.alcName === 'My Loans/Financing',
                ),
                status: loanFinancingStatus,
                casaAvailability: casaAvailability.length !== 0 ? true : false,
                haveActiveCasa:
                    casaAvailability.filter((item) => item.accountStatus === 'Active').length !== 0
                        ? true
                        : false,
            },
            // {
            //   name: "My Credit Cards",
            //   donutColor: "#86A2DA",
            //   items: this._accountSummary.assetLiabilities.filter(item => item.alCategory === 'Liabilities' && item.alcName === 'My Credit Cards'),
            //   status: creditCardStatus
            // }
        ];
    }
    constructor(private store: Store<fromStore.AppState>) {}

    tabChanged(): void {
        this.tabClickCount++;
        this.selectedTabIndex = this.tabGroup.selectedIndex;
        if (this.tabClickCount == 1 && this.selectedTabIndex == 1) {
            this.loadAdobeAnalytics();
        }
        this.tabChangeEvent.emit(this.selectedTabIndex);
    }

  loadAdobeAnalytics() {
    const day = getDayOfWeek();
    this.store.select(getClicksCustomerInfo).subscribe((info) => {
      this.currentCustomerType = info['accountStatus'] === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
    });
    setOccuranceAndAnalyticsData(
      {
        wealthOccurence: 'wealth:tab-view'
      },
      {
        wealthAnalyticsData: {
          page: {
            category: {
              primaryCategory: 'Wealth Dashboard Module',
              subCategory1: 'Liabilities',
              pageType: 'Dashboard Summary'
            },
            pageInfo: {
              pageName: 'Wealth: My Wealth Dashboard',
              day: day
            }
          },
          user: {
            loginStatus: 'logged-in',
            memberLoginType: 'repeat',
            customerType: this.currentCustomerType
          }
        }
      }
    );
  }

    openRiskProfilePopup(event) {
        this.openRiskProfileEvent.emit(event);
    }
}
