import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setEventAndDigitalData } from 'libs/common/src/lib/utils/analytics/adobe-analytics.utils';
import { getDayOfWeek } from 'libs/mint/src/lib/utils/date/date.util';

@Injectable({
    providedIn: 'root'
})
export class AnalyticService {
    constructor(private router: Router) {}

    pageNameUrl() {
        switch (this.router.url) {
            case '/dashboard':
                return 'Wealth: My Unit Trust Dashboard';

            case '/available-funds':
                return 'Wealth: Available Funds';

            case '/cart':
                return 'Wealth: My Cart';

            case '/review-purchase':
                return 'Wealth: Review and Complete Purchase';
            
            case '/available-funds/fund-detail':
                return 'Wealth: UT Fund Details';
            
            default:
                return 'Wealth: My Wealth Dashboard';
        }
    }

    loadPopUpAnalytics(errorMsg: string) {
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:error-popup',
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Error Module',
                            pageType: 'Error',
                        },
                        pageInfo: {
                            pageName: this.pageNameUrl(),
                            day: day,
                        },
                    },
                    error: {
                        errorCode: errorMsg,
                    },
                },
            },
        );
    }
    loadAnalytisFundDetails(fundToRoute: any, customerType: string){
        const day = getDayOfWeek();
        setEventAndDigitalData(
          {
            wealthEvent: 'wealth:funddetail'
          },
          {
            wealthDigitalData: {
              page: {
                category: {
                  primaryCategory: 'Unit Trust Module',
                  subCategory1:'UT Funds Pricing Listing',
                  pageType: 'Content'
                },
                pageInfo: {
                  pageName:'Wealth: UT Fund Details',
                  day: day
                }
              },
              user: {
                loginStatus: 'logged-in',
                customerType: customerType
            },
            product: {
                category: 'Unit Trust',
                fundCategory: fundToRoute.risk_name,
                productName: fundToRoute.fund_name,
                ID: fundToRoute.fund_code
                }
            }
          }
        );
      }
}
