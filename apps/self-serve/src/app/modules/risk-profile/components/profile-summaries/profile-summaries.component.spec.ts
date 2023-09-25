import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getRiskProfileResults } from '../../+state/risk-profile.selectors';
import { mockSubmitAnswerResponse } from '../../mock/data';

import { ProfileSummariesComponent } from './profile-summaries.component';
import { DialogAlertComponent } from '@cimb/mint';
import { AnalyticService } from '@cimb/shared/services';

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('ProfileSummariesComponent', () => {
    let component: ProfileSummariesComponent;
    let fixture: ComponentFixture<ProfileSummariesComponent>;
    let dialog: any;
    let store: MockStore;
    let analyticService: AnalyticService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileSummariesComponent],
            imports: [MatDialogModule, StoreModule.forRoot({}), RouterTestingModule],
            providers: [
                {
                    provide: MatDialog,
                    useClass: dialogMock,
                    AnalyticService,
                    value: mockSubmitAnswerResponse,
                },
                provideMockStore({
                    initialState: {
                        questions: null,
                    },
                    selectors: [
                        { selector: getRiskProfileResults, value: mockSubmitAnswerResponse },
                    ],
                }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSummariesComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        analyticService = TestBed.inject(AnalyticService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openRiskCalculationDialog', () => {
        component.openRiskCalculationDialog();
    });

    describe('checkIfSolePropDialog', () => {
        it('should open dialog if if customer is sole prop', () => {
            dialog.open = jest.fn();

            component.checkIfSolePropDialog();

            expect(dialog.open).toBeCalledTimes(1);
        });
    });
    it('should call clickToSubmitAAData', () => {
        component.customerType = 'NTP';
        component.clickToSubmitAAData();
        expect(component).toBeTruthy();
    });

    it('should call loadSummarySection()', () => {
        expect(component.loadSummarySection()).toBeUndefined();
    });

    describe('openDialog', () => {
        // Test case for when casaIndecater is 'N'
        it('should open DialogAlertComponent with appropriate data when casaIndecater is "N"', () => {
            // Set up test data
            component.casaIndicator = 'N';
            dialog.open = jest.fn();
            // Call the method being tested
            component.openDialog();
            // Verify that the correct dialog was opened with the correct data
            expect(dialog.open).toHaveBeenCalledWith(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Transact (No CASA)',
                    dialogContent:
                        '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
        });
        // Test case for when soleProp is 'P'
        it('should open DialogAlertComponent with appropriate data when soleProp is "P"', () => {
            // Set up test data
            expect(component).toBeTruthy;
            component.soleProp = 'P';
            dialog.open = jest.fn();
            // Call the method being tested
            component.openDialog();
            // Verify that the correct dialog was opened with the correct data
            expect(dialog.open).toHaveBeenCalledWith(DialogAlertComponent, {
                panelClass: 'custom-dialog',
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading:
                        'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>',
                    dialogContent:
                        '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
        });

        // Test case for when amlCheckResult is false
        it('should open DialogAlertComponent with appropriate data when amlCheckResult is false', () => {
            // Set up test data
            expect(component).toBeTruthy;
            component.amlCheckResult = false;
            dialog.open = jest.fn();

            // Call the method being tested
            component.openDialog();

            // Verify that the correct dialog was opened with the correct data
            expect(dialog.open).toHaveBeenCalledWith(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Proceed',
                    dialogContent:
                        '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Close',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
        });
    });
});
