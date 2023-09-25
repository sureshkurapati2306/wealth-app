import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { DialogAlertComponent } from '@cimb/mint';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../apps/self-serve/src/app/core/state/reducers';
import { AnalyticService } from '@cimb/shared/services';
import { selectAccountStatus } from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { DialogCsatSurveyComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-csat-survey/dialog-csat-survey.component';
import * as CSATSurveyActions from 'apps/self-serve/src/app/core/state/csat-survey/csat-survey.actions';
import * as CSATSuveySelector from 'apps/self-serve/src/app/core/state/csat-survey/csat-survey.selectors';
import { CSATSurvey } from 'apps/self-serve/src/app/core/model/csat-survey.model';

@Component({
    selector: 'cimb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() hamburgerMenu = true;
    @Input() headerLogoUrl: string;
    @Input() totalFundsCount = 0;
    @Input() showCartIcon = true;
    @Input() userType: string;
    @Input() customerName = '';
    @Input() canNavigateToDashboard = true;
    @Output() viewMyCart: EventEmitter<any> = new EventEmitter();
    @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
    @Output() pageRedirectEvent: EventEmitter<any> = new EventEmitter();
    @Input() canNavigateToAsnbDashboard = true;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    currentRoute: string;
    lastScrolledPosition: number;
    applyHeightProperty = true;
    openedMenu: any;
    csatSurveyObservable$: Observable<CSATSurvey>;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        location: Location,
        private store: Store<fromStore.AppState>,
        private analyticService: AnalyticService,
    ) {
        if (location.path() != '') {
            this.currentRoute = location.path();
        }
    }

    ngOnInit(): void {
        if (this.currentRoute === '/dashboard') {
            this.currentRoute = 'dashboard';
        } else if (this.currentRoute === '/wealthdashboard') {
            this.currentRoute = 'wealthdashboard';
        } else if (this.currentRoute === '/purchase-summary') {
            this.currentRoute = 'purchaseSummary';
        } else if (this.currentRoute === '/asnb-dashboard') {
            this.currentRoute = 'asnbDashboard';
        }
    }

    //scroll event for logout button on side nav visibile on mobile view
    @HostListener('window:scroll', ['$event'])
    doSomething(event) {
        if (this.lastScrolledPosition > 5 && this.openedMenu) {
            this.applyHeightProperty = false;
        } else {
            this.applyHeightProperty = true;
        }
        this.lastScrolledPosition = window.pageYOffset;
    }

    viewMyCartClick() {
        if (this.userType === 'NTP') {
            this.store
                .select(selectAccountStatus)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((value) => {
                    if (value === 'Y') {
                        this.viewMyCart.emit();
                    } else {
                        const dialogImage =
                            '<img src="./assets/images/open-account.svg" alt="Change Primary Unit Trust Account" />';
                        const dialogContent =
                            "<p>We noticed you don't have a Unit Trust account with us yet. Complete your account opening to proceed with checkout.</p>";
                        this.openUtAccount(dialogImage, dialogContent);
                    }
                });
        } else {
            this.viewMyCart.emit();
        }
    }

    openUtAccount(dialogImage, dialogContent) {
        const dialogRefOPenAccount = this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: dialogImage,
                dialogHeading: 'Open Unit Trust Account',
                dialogContent: dialogContent,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Continue',
            },
        });

        dialogRefOPenAccount.afterClosed().subscribe((result) => {
            if (result === 'Continue') {
                this.router.navigate(['/opening-account']);
            }
        });
    }

    contactUs() {
        window.open('https://www.cimb.com.my/en/personal/help-support/contact-us.html');
    }

    pageRedirect(event) {
        this.pageRedirectEvent.emit(event.target.innerText);
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

    Logout() {
        const dialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'Logout from CIMB My Wealth',
                dialogContent: '<p>Are you sure you want to logout?</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Proceed to Logout',
                dialogImage: '<img src="./assets/images/Illustration_Cart 3.svg" alt="Logout" />',
            },
        });
        // Calling dialog
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'Proceed to Logout') {
                this.store.dispatch(CSATSurveyActions.loadCSATSurvey());
                this.csatSurveyObservable$ = this.store.select(CSATSuveySelector.selectCSATSurveyPopup);
                this.csatSurveyObservable$.pipe(skip(1),
                    takeUntil(this._unsubscribeAll)).subscribe((result) => {
                        if (result.logoutPrompterRequired) {
                            this.openFeedbackSurveyDialog(result)
                        } else {
                            this.logoutEvent.emit(result);
                        }
                    });
            }
        });
    }

    openFeedbackSurveyDialog(data) {
        const dialogSurvey = this.dialog.open(DialogCsatSurveyComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            disableClose: true,
            data: data
        });

        dialogSurvey.afterClosed().subscribe((result) =>{
            this.logoutEvent.emit(result);
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
