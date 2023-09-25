import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewEncapsulation,
    ViewChild,
    OnDestroy,
    AfterViewInit,
    OnChanges,
    OnInit,
} from '@angular/core';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AssetLiability } from '@cimb/shared/models';
import { SwiperComponent } from 'swiper/angular';
import { Router } from '@angular/router';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import * as WealthDashboardSelectors from '../../../../../../../apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import { Store } from '@ngrx/store';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticService } from '@cimb/shared/services';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

@Component({
    selector: 'cimb-carousel-wealth-banners',
    templateUrl: './carousel-wealth-banners.component.html',
    styleUrls: ['./carousel-wealth-banners.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CarouselWealthBannersComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    constructor(
        private router: Router,
        private store: Store<fromStore.AppState>,
        public dialog: MatDialog,
        private analyticService: AnalyticService
    ) {
        this.interval$ = timer(3000, 3000).pipe(
            tap(() => {
                if (this.swiper?.swiperRef.activeIndex < this.numOfSlides - 1) {
                    this.swiper?.swiperRef.slideNext();
                } else {
                    this.swiper?.swiperRef.slideTo(0);
                }
            }),
        );
    }

    hasUnitTrust = false;
    hasSavingsAccount = false;
    hasFixedDeposit = false;
    hasPropertyLoan = false;
    hasAutoLoan = false;
    hasPersonalLoan = false;
    hasCreditCard = false;
    numOfSlides: number;

    riskProfileInvalid = false;
    userType: any;

    config: SwiperOptions = {
        slidesPerView: 1,
        pagination: {
            clickable: true,
        },
    };

    interval$: Observable<number>;

    @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

    @Input() bannerMode: 'assets' | 'liabilities' = 'assets';

    @Input() refreshSignal: number;

    @Input() holdingDetails: AssetLiability[];

    ngOnInit(): void {
        this.store.select('userReducer').subscribe((data) => (this.userType = data.userType));

        this.store.select(WealthDashboardSelectors.selectRiskProfileEnquiry).subscribe((res) => {
            if (res) {
                this.checkRiskProfileStatusCode(res['status'].code, this.userType);
            } else {
                this.riskProfileInvalid = true;
            }
        });
    }

    ngOnChanges() {
        this.swiper?.swiperRef.update();

        this.numOfSlides = this.swiper?.swiperRef.slides.length;

        if (this.numOfSlides <= 1) {
            this.swiper?.swiperRef.disable();
        } else {
            this.swiper?.swiperRef.enable();
        }
    }

    ngAfterViewInit() {
        this.numOfSlides = this.swiper?.swiperRef.slides.length;

        if (this.numOfSlides <= 1) {
            this.swiper?.swiperRef.disable();
        }
    }

    ngOnDestroy() {
        this.swiper.ngOnDestroy();
    }

    navigateDashboard() {
        window.open("https://www.cimb.com.my/en/personal/day-to-day-banking/investments.html", "_blank", "noopener,noreferrer");
    }

    checkRiskProfileStatusCode(riskProfileStatusCode: string, userType: string) {
        if (riskProfileStatusCode === '0' && userType === 'NTP') {
            this.riskProfileInvalid = false;
        } else if (riskProfileStatusCode !== '0') {
            this.riskProfileInvalid = true;
        } else {
            this.riskProfileInvalid = false;
        }
    }

    openDialogUnableToProceed(event) {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'Unexpected Issue',
                dialogContent:
                    '<p>We have encountered an unexpected issue. Please try again later. If this issue persists, please <strong><a class="go_to_consumer_contact_centre_link" >contact us to report this issue.</a></strong></p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Okay',
                dialogButtonProceed: false,
                dialogImage: '<em class="icon-warning"></em>',
            },
        });
        this.analyticService.loadPopUpAnalytics('Unexpected Issue');
    }
}
