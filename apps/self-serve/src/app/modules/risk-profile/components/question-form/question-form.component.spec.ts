/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MintMultiSelectChipModule, MintSingleSelectModule } from '@cimb/mint';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getQuestions } from '../../+state/risk-profile.selectors';
import { mockQuestions } from '../../mock/data';

import { QuestionFormComponent } from './question-form.component';

describe('QuestionFormComponent', () => {
    let component: QuestionFormComponent;
    let fixture: ComponentFixture<QuestionFormComponent>;
    let store: MockStore;
    let actions$: Actions;

    const landingPageResponse = {
        landingPageStatus: {
            accountEndDate: null,
            accountStartDate: null,
            accountStatus: 'Y',
            clientId: 'C1',
            clientIdType: 'CType1',
            fatcaEndDate: null,
            fatcaStartDate: null,
            fatcaStatus: 'Y',
            finalEndDate: null,
            finalStartDate: null,
            finalStatus: 'Y',
            investmentEndDate: null,
            investmentStartDate: null,
            investmentStatus: 'Y',
            landingEndDate: null,
            landingStartDate: null,
            landingStatus: 'Y',
            onboardingId: 1,
            rwsEndDate: null,
            rwsStartDate: null,
            rwsStatus: 'Y',
        },
    };


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuestionFormComponent],
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatDialogModule,
                MintSingleSelectModule,
                MintMultiSelectChipModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        questions: null,
                    },
                    selectors: [{ selector: getQuestions, value: mockQuestions }],
                }),
                provideMockActions(() => actions$),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionFormComponent);
        store = TestBed.inject(MockStore);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onSubmit', () => {
        component.userType = "NTP"
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.onSubmit()
        expect(component.landingPageStatus.rwsStatus).toBe('Y');
    });
    it('should call clickToSubmitAAData que1', () => {
        //const customerIDNumber = '800'
        component.customerType = 'NTP';
        component.clickToSubmitAAData('wealth:UT RP Input1','Wealth: Risk Profile Input 1');
        expect(component).toBeTruthy();
    });
    it('should call clickToSubmitAAData que2', () => {
        //const customerIDNumber = '800'
        component.customerType = 'NTP';
        component.clickToSubmitAAData('wealth:UT RP Input2','Wealth: Risk Profile Input 2');
        expect(component).toBeTruthy();
    });
    it('should call clickToSubmitAAData que3', () => {
        //const customerIDNumber = '800'
        component.customerType = 'NTP';
        component.clickToSubmitAAData('wealth:UT RP Input3','Wealth: Risk Profile Input 3');
        expect(component).toBeTruthy();
    });
});
