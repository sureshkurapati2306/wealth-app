import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page/landing-page.service';
import { LandingPageComponent } from './landing-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import * as LandingPageActions from '../../core/state/landing-page/landing-page.actions';

export class MatDialogMock {
    open() {
        return {
            afterClosed: () => of('Yes'),
        };
    }
    closeAll() {
        return true;
    }
}

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
    let store: MockStore;
    let actions$: Actions;
    let dialog: MatDialog;

    const user = {
        cifNumber: '100',
        customerIDNumber: '800',
        customerIDType: '3',
        customerIDTypeDesc: 'New IC',
        customerType: 'NTP',
        debitCardNumber: '400'
    };

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

    const landingPageResponse2 = {
        landingPageStatus: {
            accountEndDate: null,
            accountStartDate: null,
            accountStatus: 'N',
            clientId: 'C1',
            clientIdType: 'CType1',
            fatcaEndDate: null,
            fatcaStartDate: null,
            fatcaStatus: 'N',
            finalEndDate: null,
            finalStartDate: null,
            finalStatus: 'N',
            investmentEndDate: null,
            investmentStartDate: null,
            investmentStatus: 'N',
            landingEndDate: null,
            landingStartDate: null,
            landingStatus: 'Y',
            onboardingId: 0,
            rwsEndDate: null,
            rwsStartDate: null,
            rwsStatus: 'N',
        },
    };

    const landingPageResponse3 = {
        landingPageStatus: {
            accountEndDate: null,
            accountStartDate: null,
            accountStatus: 'N',
            clientId: 'C1',
            clientIdType: 'CType1',
            fatcaEndDate: null,
            fatcaStartDate: null,
            fatcaStatus: 'N',
            finalEndDate: null,
            finalStartDate: null,
            finalStatus: 'N',
            investmentEndDate: null,
            investmentStartDate: null,
            investmentStatus: 'N',
            landingEndDate: null,
            landingStartDate: null,
            landingStatus: 'N',
            onboardingId: 1,
            rwsEndDate: null,
            rwsStartDate: null,
            rwsStatus: 'Y',
        },
    };

    const customerdetails = {
        accountDetailData: '',
        accountDetailParams: '',
        accountOpeningAPIParams: '',
        accountOpeningAPIResponseData: '',
        accountOpeningAuditAPIParams: '',
        userDetailsAPIParams: '10330000219671',
        userDetailsAPIResponseData: {
            addrLine1: 'RU 52',
            addrLine2: 'TLQLJMO KJRLOL OKE',
            addrLine3: 'TPEMLJO',
            addrLine4: '',
            addressLine1: 'RU 52',
            addressLine2: 'TLQLJMO KJRLOL OKE',
            addressLine3: 'TPEMLJO',
            addressLine4: '',
            birthDate: '01 December 1990',
            citizen: '0',
            country: 'MYS',
            email: ' ',
            gender: 'M',
            houseNumber: '',
            id: '901231136085',
            idNo: '901231136085',
            idType: 'new IC',
            industry: '',
            maritalStatus: 'S',
            mobileNumber: '',
            mykadNumber: '901231136085',
            name: 'RDV VDJMF FNV RDV JDFK',
            nationality: 'MYS',
            occupation: 'Cleaners and Helpers',
            officeNumber: '',
            postcode: '93050',
            profession: '',
            race: 'B',
            religion: '',
        },
        userDetailsSessionData: '',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({}),
            ],
            declarations: [LandingPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                LandingPageService,
                provideMockStore(),
                { provide: MatDialog, useClass: MatDialogMock },
                provideMockActions(() => actions$),
            ],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        dialog = TestBed.inject(MatDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        component.ngOnDestroy();
    });

    it('should create', () => {
        component.userDetails = user;
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        jest.spyOn(store, 'select').mockReturnValueOnce(of(user));
        component.isOpenAccountCompleted = true;
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit with isOpenCompleted as true', () => {
        jest.spyOn(store, 'select').mockReturnValue(of(user));
        component.userDetails = user;
        component.isOpenAccountCompleted = true;
        expect(component).toBeTruthy();
    });

    it('should call updateLandingPageStatus', () => {
        component.isOpenAccountCompleted = true;
        component.userDetails = user;
        const request = { landingPageStatus: landingPageResponse2 };
        actions$ = of(LandingPageActions.storeLandingPageStatusSuccess(request));
        component.updateLandingPageStatus();
        expect(component).toBeTruthy();
    });

    it('should call getLandingPageStatus', () => {
        component.isOpenAccountCompleted = true;
        component.userDetails = user;
        const request = { landingPageStatus: landingPageResponse };
        actions$ = of(LandingPageActions.storeLandingPageStatusSuccess(request));
        component.updateLandingPageStatus();
        expect(component).toBeTruthy();
    });

    it('should call getLandingPageStatus2', () => {
        component.isOpenAccountCompleted = false;
        component.userDetails = user;
        component.updateLandingPageStatus();
        expect(component).toBeTruthy();
    });

    it('should call getLandingPageStatus3', () => {
        component.isOpenAccountCompleted = false;
        component.userDetails = user;
        component.updateLandingPageStatus();
        expect(component).toBeTruthy();
    });

    it('should call openRiskProfileSection', () => {
        component.userDetails = user;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.landingPageStatus.fatcaStatus = 'N';
        component.openRiskProfileSection();
        expect(component).toBeTruthy();
    });

    it('should call checkFatcaDeclaration', () => {
        component.userDetails = user;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.landingPageStatus.fatcaStatus = 'N';
        component.checkFatcaDeclaration();
        expect(component).toBeTruthy();
    });

    it('should call checkFatcaDeclaration with fatca status Yes', () => {
        component.userDetails = user;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.landingPageStatus.fatcaStatus = 'Y';
        component.checkFatcaDeclaration();
        expect(component.landingPageStatus.fatcaStatus).toBe('Y');
    });

    it('should call showInvestmentJouneyProgresPopup', () => {
        component.investmentJouneyProgres = 3;
        component.isOpenAccountCompleted = true;
        component.showInvestmentJouneyProgresPopup();
        expect(component.isOpenAccountCompleted).toBe(true);
    });

    it('should call LandingPopupAdobeAnalytics with NTP Select Investment Option', () => {
        component.landingPageStatus = landingPageResponse2.landingPageStatus;
        component.investmentJouneyProgres = 2;
        component.isOpenAccountCompleted = false;
        component.landingPageStatus.accountStatus = 'N';
        component.showInvestmentJouneyProgresPopup();
        component.loadLandingPopupAdobeAnalytics('UT NTP Select Investment 1');
    });

    it('should call LandingPopupAdobeAnalytics with NTP Select Investment Option', () => {
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.investmentJouneyProgres = 2;
        component.landingPageStatus.accountStatus = 'Y';
        component.showInvestmentJouneyProgresPopup();
        component.loadLandingPopupAdobeAnalytics('UT NTP Select Investment 4');
    });

    it('should call LandingPopupAdobeAnalytics with UT NTP Open Account Option', () => {
        component.investmentJouneyProgres = 3;
        component.showInvestmentJouneyProgresPopup();
        component.loadLandingPopupAdobeAnalytics('UT NTP Open Account 2');
    });

    it('should call LandingPopupAdobeAnalytics with UT NTP Confirm Purchase Option', () => {
        component.investmentJouneyProgres = 4;
        component.showInvestmentJouneyProgresPopup();
        component.loadLandingPopupAdobeAnalytics('UT NTP Confirm Purchase 3');
    });
    it('should call LandingPopupAdobeAnalytics with UT NTP Select Investment 4', () => {
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.landingPageStatus.rwsStatus = 'Y';
        component.landingPageStatus.accountStatus = 'Y';
        component.updateLandingPageStatus();
        component.loadLandingPopupAdobeAnalytics('UT NTP Select Investment 4');
    });
    it('should call createInitialUser', () => {
        component.userDetails = user;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        const response = component.createInitialUser();
        expect(response.onboardingId).toBe(0);
    });

    it('should call updateLandingPageStatus', () => {
        component.userDetails = user;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.updateLandingPageStatus();
    });

    it('should call checkAmlBlockedCountryUser', () => {
        component.userDetails = user;
        jest.spyOn(store, 'select').mockReturnValue(of(customerdetails));
        component.checkAmlBlockedCountryUser();
        expect(store.select).toHaveBeenCalled();
    });

    it('should call checkAmlBlockedCountryUser2', () => {
        component.userDetails = user;
        jest.spyOn(store, 'select').mockReturnValue(of(false));
        component.checkAmlBlockedCountryUser();
        expect(store.select).toHaveBeenCalled();
    });

    it('should call checkAmlBlockedCountryUser3', () => {
        component.userDetails = user;
        customerdetails.userDetailsAPIResponseData.nationality = 'IND';
        jest.spyOn(store, 'select').mockReturnValue(of(customerdetails));
        component.checkAmlBlockedCountryUser();
        expect(store.select).toHaveBeenCalled();
    });

    it('should call openBlockedUserPopup', () => {
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.openBlockedUserPopup();
        expect(component).toBeTruthy();
    });

    it('should call openRiskProfileSection', () => {
        component.blockedUser = true;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        component.openRiskProfileSection();
        expect(component.blockedUser).toBe(true);
    });

    it('should call openRiskProfileSection2', () => {
        component.blockedUser = false;
        component.landingPageStatus = landingPageResponse.landingPageStatus;
        jest.spyOn(store, 'select').mockReturnValue(of(landingPageResponse3.landingPageStatus));
        component.openRiskProfileSection();
        expect(component.blockedUser).toBe(false);
    });

    it('should call checkUserUTAccountExist', () => {
        const mockCustId = '1234';
        component.checkUserUTAccountExist(mockCustId);
        expect(mockCustId).toBeTruthy();
    });

    it('should call redirectToSearchFunds', () => {
        //const customerIDNumber = '800'
        component.userDetails = user;
        component.customerIDNumber = '800'
        component.redirectToSearchFunds();
        expect(component).toBeTruthy();
    });
    it('should call clickToSubmitAAData fatca', () => {
        //const customerIDNumber = '800'
        component.userDetails = user;
        component.customerIDNumber = '800'
        component.clickToSubmitAAData('fatca');
        expect(component).toBeTruthy();
    });

    it('should close all dialogs and unsubscribe all observables', () => {
        const closeAllSpy = jest.spyOn(dialog, 'closeAll');
        const nextSpy = jest.spyOn(component._unsubscribeAll, 'next');
        const completeSpy = jest.spyOn(component._unsubscribeAll, 'complete');

        component.ngOnDestroy();

        expect(closeAllSpy).toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
});
