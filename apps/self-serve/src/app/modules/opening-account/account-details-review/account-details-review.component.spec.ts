import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailsReviewComponent } from './account-details-review.component';
import { AccountPersonalDetails } from '@cimb/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('AccountDetailsReviewComponent', () => {
    let component: AccountDetailsReviewComponent;
    let fixture: ComponentFixture<AccountDetailsReviewComponent>;
    let store: MockStore;

    const landingPageResponse = {
        landingPageStatus: {
          accountEndDate: null,
          accountStartDate: null,
          accountStatus: "Y",
          clientId: "C1",
          clientIdType: "CType1",
          fatcaEndDate: null,
          fatcaStartDate: null,
          fatcaStatus: "Y",
          finalEndDate: null,
          finalStartDate: null,
          finalStatus: "Y",
          investmentEndDate: null,
          investmentStartDate: null,
          investmentStatus: "Y",
          landingEndDate: null,
          landingStartDate: null,
          landingStatus: "Y",
          onboardingId: 1,
          rwsEndDate: null,
          rwsStartDate: null,
          rwsStatus: "Y",
        }
      };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountDetailsReviewComponent],
            providers: [ provideMockStore() ],
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                RouterTestingModule.withRoutes([]),
                BrowserAnimationsModule,
            ],
            
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountDetailsReviewComponent);
        component = fixture.componentInstance;
        // pass in the form dynamically
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
  
    it('AccountDetailsReviewComponent ngOnInit -  clicked', () => {
        expect(component.ngOnInit()).toBeUndefined();
    });
    it('AccountDetailsReviewComponent ngOnInit -  clicked', () => {
        const accountOpeningValues: AccountPersonalDetails = {
            addrLine1: "Jalan Madrasah",
            addrLine2: "Jalan 1/22a, Taman Melati",
            addrLine3: "",
            addrLine4: "",
            addressLine1: "Jalan Madrasah",
            addressLine2: "Jalan 1/22a, Taman Melati",
            addressLine3: "",
            addressLine4: "",
            dob: "11 June 1984",
            birthDate: "11 June 1984",
            citizen: "0",
            country: "MY",
            email: "john.wick@gmail.com",
            gender: "M",
            id: 930505086630,
            // idType: "002",
            industry: "",
            maritalStatus: "S",
            mobileNum: "60311234567",
            mykadNumber: "930505086630",
            houseNum: "",
            name: "John",
            nationality: "MY",
            officeNum: "",
            postcode: "53100",
            profession: "",
            race: "I",
            religion: "C",
            settlementAccount: [{
                accountNumber: "16285729231",
                accountType: "CIMB Current Account",
                amount: "223,242.00",
                balanceType: "Current",
                settlementAcctType: "C"
            }, {
                accountNumber: "75285829533",
                accountType: "CIMB Saving Account",
                amount: "21,890.00",
                balanceType: "Current",
                settlementAcctType: "I"
            }],
            state: "14",
            title: ""
        }
        component.accountPersonalDetails = [];
        component.accountPersonalDetails = [accountOpeningValues];
        component.ngOnInit();
        expect([accountOpeningValues]).toBeDefined();
    });
    it('AccountDetailsReviewComponent confirmAccountDetails -  clicked', () => {
        jest.spyOn(component.btnSubmit, 'emit');
        component.confirmAccountDetails()
        expect(component.btnSubmit.emit).toHaveBeenCalledWith('btnSubmit');
        expect(component.confirmAccountDetails()).toBeUndefined();
    });
    it('AccountDetailsReviewComponent editButton -  clicked', () => {
        const $event = 'otherDetails';
        jest.spyOn(component.previousPage, 'emit');
        component.editButton($event)
        expect(component.previousPage.emit).toHaveBeenCalledWith($event);
    });


});
