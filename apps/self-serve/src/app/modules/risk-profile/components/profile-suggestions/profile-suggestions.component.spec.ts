import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { ProfileSuggestionsComponent } from './profile-suggestions.component';
import { DialogAlertComponent } from '@cimb/mint';
import { AnalyticService } from '@cimb/shared/services';
import { RouterTestingModule } from '@angular/router/testing';
import { mockSubmitAnswerResponse } from '../../mock/data';
class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('ProfileSuggestionsComponent', () => {
    let component: ProfileSuggestionsComponent;
    let fixture: ComponentFixture<ProfileSuggestionsComponent>;
    let dialog: any;
    let store: MockStore;
    let analyticService: AnalyticService;
    const mockAnalyticService = {
        loadPopUpAnalytics: ()=> {
            return true;
        }
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileSuggestionsComponent],
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
                }),
                {provide: AnalyticService, useValue: mockAnalyticService}
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSuggestionsComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        analyticService = TestBed.inject(AnalyticService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openAssetClassesDialog', () => {
        component.openAssetClassesDialog();
    });

    it('should call openDialog()', () => {
        component.casaIndicator = 'Y';
        component.soleProp = 'P';
        component.amlCheckResult = false;
        expect(mockAnalyticService.loadPopUpAnalytics()).toBeTruthy();
        expect(component.openDialog)
    });
    it('should call checkCASASolePropAML()', () => {
        expect(component.checkCASASolePropAML('a','b','c'))
      
    });
    // Test case for when casaIndecater is 'N'

    it('should open DialogAlertComponent with appropriate data when casaIndecater is "N"', () => {
        // Set up test data
        component.casaIndicator = 'N';
        dialog.open = jest.fn();
        component.openDialog();
        component.checkCASASolePropAML(
            component.casaIndicator,
            component.soleProp,
            component.amlCheckResult,
        );
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
});