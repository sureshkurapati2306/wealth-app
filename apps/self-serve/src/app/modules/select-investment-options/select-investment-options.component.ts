import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FeatureList } from '@cimb/shared/models';
import * as fromStore from '../../core/state/reducers';
import { AppService } from '../../core/services/app.service';
import { path } from '../../shared/config/path';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';


@Component({
    selector: 'cimb-select-investment-options',
    templateUrl: './select-investment-options.component.html',
    styleUrls: ['./select-investment-options.component.scss'],
})
export class SelectInvestmentOptionsComponent implements OnInit, OnDestroy {
    pageTitle = 'Select Investments';
    isBackButtonEnabled = true;

    featureGuideList: FeatureList[];
    boxGuideTitle = 'Guide Me';
    boxGuideText = 'Start investing based on your risk profile asset allocation.';
    boxGuideButtonLabel = 'Start investing';
    currentCustomerType = 'NTP';
    featureSearchList: FeatureList[];
    boxSearchTitle = 'Search for funds';
    boxSearchText = 'Search for funds and put together your own investment with total freedom.';
    boxSearchButtonLabel = 'Search now';
    currentUrl: any;
    clicksInfo: any;
    userObservable: Observable<any>;
    userSubscription: Subscription;
    customerType : any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private store: Store<fromStore.AppState>,
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }
    ngOnInit(): void {
        this.clicksInfo = this.route.snapshot.data['clicksData'];

        this.featureGuideList = [
            { featureText: 'Suitable for investors who need guidance' },
            { featureText: 'See asset class breakdowns as an investment guide' },
            {
                featureText:
                    'View offerings from CIMB Focus Funds and find other funds according to your preference.',
            },
        ];
        this.featureSearchList = [
            { featureText: 'Suitable for experienced investors' },
            { featureText: 'View over 200 available funds including CIMB Focus Funds' },
        ];
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.customerType = users.userType;
        });
        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.customerType = info.customerType;
        });
        this.clickToSubmitAAData('On Load');
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }

    guideButtonClick(): boolean {
        this.router.navigate([path.PORTFOLIO_RECOMMENDATION]);
        this.clickToSubmitAAData('Click1');
        return true;
    }

    searchButtonClick(): boolean {
        this.router.navigate([path.AVAILABLE_FUND]);
        this.clickToSubmitAAData('Click2');
        return true;
    }

    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
        }
        this.router.navigate([this.currentUrl]);
    }

    clickToSubmitAAData(question) {
        if(this.customerType === 'NTP'){
            this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
                this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
            });
        }else{
            this.currentCustomerType = this.customerType;
        }
        const day = getDayOfWeek();
        if (question === 'On Load') {
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:allpage'
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Listing'
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT Investment Options',
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

        } else if (question === 'Click1') {
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:buttonctr'
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Listing'
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT Investment Options'
                            }
                        },
                        button: {
                            buttonName: 'Start investing'
                        }
                    }
                }
            );
        } else if (question === 'Click2') {
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:buttonctr'
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Listing'
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT Investment Options'
                            }
                        },
                        button: {
                            buttonName: 'Search now'
                        }
                    }
                }
            );
        }
    }
}
