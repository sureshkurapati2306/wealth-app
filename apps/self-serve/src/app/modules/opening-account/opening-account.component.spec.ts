import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { OpeningAccountComponent } from './opening-account.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page/landing-page.service';
import * as UserAction from '../../core/state/user/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DecimalPipe } from '@angular/common';
import * as LandingPageActions from '../../core/state/landing-page/landing-page.actions';
import * as AccountOpeningActions from '../../core/state/account-opening/account.actions';
import * as CartActions from '../../core/state/cart/cart.actions';
import { path } from '../../shared/config/path';

describe('OpeningAccountComponent', () => {
    let component: OpeningAccountComponent;
    const formBuilder: FormBuilder = new FormBuilder();
    let landingPageService: LandingPageService;

    let fixture: ComponentFixture<OpeningAccountComponent>;
    const initialState = { utAccOpeningPostObject: {} };
    let store: MockStore;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpeningAccountComponent],
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                LandingPageService,
                DeviceDetectorService,
                DecimalPipe,
                { provide: FormBuilder, useValue: formBuilder },
                { provide: MatDialog, useValue: '' },

                provideMockStore({ initialState }),
                // other providers
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        store = TestBed.inject(MockStore);
        landingPageService = TestBed.inject(LandingPageService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpeningAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        jest.spyOn(store, 'dispatch');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('call enablePersonalDetails return value', () => {
        const result = {
            cifNumber: '10280000511312',
            customerIDNumber: '880318145905',
            customerIdType: null,
            debitCardNumber: '5196032215005121',
            customerIDTypeDesc: null,
        };

        const action = new UserAction.UpdateUserDetails(
            result.customerIdType
        );

        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        jest.spyOn(store, 'select').mockImplementation((clicks) => {
            return of({
                cifNumber: '10280000511312',
                customerIDNumber: '880318145905',
                customerIdType: null,
                debitCardNumber: '5196032215005121',
                customerIDTypeDesc: null,
            });
        });

        component.enablePersonalDetails();

        fixture.detectChanges();
        // expect(store.dispatch).toHaveBeenCalledTimes(2);

        store.select('accountOpeningReducer').subscribe((data) => {
            fixture.detectChanges();

            expect(data).toBeTruthy();
        });

        of(result).subscribe((data) => {
            expect(data).toBeDefined();
            expect(data.cifNumber).toEqual(result.cifNumber);
            expect(data.debitCardNumber).toBeDefined();
            expect(data.customerIDNumber).toBeDefined();
        });
    });

    it('call enablePersonalDetails return no value', () => {
        const result = {
            cifNumber: null,
            customerIDNumber: null,
            customerIdType: null,
            debitCardNumber: null,
            customerIDTypeDesc: null,
        };

        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        jest.spyOn(store, 'select').mockImplementation((clicks) => {
            return of(null);
        });

        component.enablePersonalDetails();

        store.select('accountOpeningReducer').subscribe((data) => {
            fixture.detectChanges();
            expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
            expect(data).toBeFalsy();
        });

        of(result).subscribe((data) => {
            expect(data).toEqual(null);
            expect(data.cifNumber).toEqual(null);
            expect(data.debitCardNumber).toEqual(null);
            expect(data.customerIDNumber).toEqual(null);
        });
    });

    it('should chk goToStepOne', () => {
        component.goToStepOne();
        expect(component.step2).toBe(false);
        expect(component.step3).toBe(false);
        expect(component.step1).toBe(true);
        component.accountOpeningPostObject = {
            ...component.accountOpeningPostObject,
            ...component.personalData,
        };
        expect(component.accountOpeningPostObject).toBeTruthy();
    });

    it('should chk goToStepTwo', () => {
        component.goToStepTwo();
        expect(component.step1).toBe(false);
        expect(component.step3).toBe(false);
        expect(component.step2).toBe(true);
    });

    it('should chk goToSteps page 1', () => {
        component.goToSteps('otherDetails');
        expect(component.step1).toBe(false);
    });

    it('should chk goToSteps page 2', () => {
        component.goToSteps('personalDetails');
        expect(component.step2).toBe(false);
    });

    it('should chk step1Submited', () => {
        const eventData = {
            id: '930505086630',
            idNo: '930505086630',
            idType: '002',
            industry: '',
            maritalStatus: 'S',
            mobileNumber: '60311234567',
            mykadNumber: '930505086630',
        };
        component.step1Submited(eventData);
        component.personalData = eventData;
        expect(component.step1).toBe(false);
        expect(component.step2).toBe(true);
        component.accountOpeningPostObject = {
            ...component.accountOpeningPostObject,
            ...component.personalData,
        };
    });

    it('should chk step2Submited', () => {
        const event = {
            otherAccountFormGroup: formBuilder.group({
                bankAcctNo: [''],
                nationality: [''],
                citizen: [''],
                gender: [''],
            }),
            accountDetail: {
                id: '930505086630',
                idNo: '930505086630',
                idType: '002',
                industry: '',
                maritalStatus: 'S',
                mobileNumber: '60311234567',
                mykadNumber: '930505086630',
            },
        };

        component.odFieldsList = event.accountDetail;
        component.step3 = true;
        component.step2Submited(event);
        expect(component.step2).toBe(false);
        expect(component.step3).toBe(true);
        component.accountOpeningPostObject = {
            ...component.accountOpeningPostObject,
            ...event.otherAccountFormGroup,
        };
    });

    it('should chk bindFieldCodes for populate', () => {
        const accountOpeningPostObject = {
            addrLine1: 'Jalan Madrasah',
            addrLine2: 'Jalan 1/22a, Taman Melati',
            addrLine3: '',
            addrLine4: '',
            addressLine1: 'Jalan Madrasah',
            addressLine2: 'Jalan 1/22a, Taman Melati',
            addressLine3: '',
            addressLine4: '',
            birthDate: '11 June 1984',
            citizen: '0',
            country: 'MY',
            email: 'john.wick@gmail.com',
            gender: 'M',
            houseNumber: '',
            id: '930505086630',
            idNo: '930505086630',
            idType: '002',
            industry: '',
            maritalStatus: 'S',
            mobileNumber: '60311234567',
            mykadNumber: '930505086630',
            name: 'John',
            nationality: 'MY',
            officeNumber: '',
            postcode: '53100',
            profession: '',
            race: 'I',
            religion: 'C',
            settlementAccount: [
                {
                    accountNumber: '16285729231',
                    accountType: 'CIMB Current Account',
                    amount: '223,242.00',
                    balanceType: 'Current',
                    settlementAcctType: 'C',
                },
                {
                    accountNumber: '75285829533',
                    accountType: 'CIMB Saving Account',
                    amount: '21,890.00',
                    balanceType: 'Current',
                    settlementAcctType: 'I',
                },
            ],
            state: '14',
            title: '',
        };
        const odFieldsList = {
            industryList: [
                {
                    employmentCode: '01120',
                    employmentId: 102,
                    employmentShortName: 'Agriculture - Growing of paddy',
                },
            ],
            stateList: [
                {
                    countryCode: 'MY',
                    stateCode: '01',
                    stateId: 102,
                    stateLongName: 'JOHOR DARUL TAKZIM',
                    stateShortName: 'JOHOR',
                },
            ],
            professionList: [
                {
                    createdBy: null,
                    occupationCode: 'U00X',
                    occupationId: 102,
                    occupationLongName: 'Other Outside Labour Force',
                    occupationShortName: 'OthO/sideLabourForce',
                },
            ],
        };

        component.accountOpeningPostObject = accountOpeningPostObject;
        component.odFieldsList = odFieldsList;
        component.bindFieldCodes();
        expect(component.accountOpeningPostObject).toBeTruthy();
        expect(component.utAccOpeningPostObject).toStrictEqual(
            JSON.parse(JSON.stringify(accountOpeningPostObject)),
        );
        expect(component.odFieldsList).toBeTruthy();

        component.populateIndustryCode(
            odFieldsList.industryList,
            component.utAccOpeningPostObject.industry,
        );
        component.populateStateCode(odFieldsList.stateList, component.utAccOpeningPostObject.state);
        component.populateSettlementAccount(
            accountOpeningPostObject.settlementAccount,
            component.utAccOpeningPostObject.bankAcctNo,
        );
        component.populateProfessionCode(
            odFieldsList.professionList,
            component.utAccOpeningPostObject.profession,
        );
        expect(component.bindFieldCodes());
    });
    it('should chk populateIndustryCode', () => {
        const industryList = [
            {
                employmentCode: '01120',
                employmentId: 102,
                employmentShortName: 'Agriculture - Growing of paddy',
            },
        ];
        const indudtryCode = 'Agriculture - Growing of paddy';
        component.utAccOpeningPostObject = {};
        component.utAccOpeningPostObject.industry = '';
        component.populateIndustryCode(industryList, indudtryCode);
        expect(industryList).toBeTruthy();
        expect(indudtryCode === industryList[0].employmentShortName).toBe(true);
        expect(component.utAccOpeningPostObject.industry).toBeTruthy();
        expect(component.utAccOpeningPostObject.industry).toBe(industryList[0].employmentCode);
    });
    it('should chk populateProfessionCode', () => {
        const professionList = [
            {
                createdBy: null,
                occupationCode: 'U00X',
                occupationId: 102,
                occupationLongName: 'Other Outside Labour Force',
                occupationShortName: 'OthO/sideLabourForce',
            },
        ];
        const professionCode = 'Other Outside Labour Force';
        component.utAccOpeningPostObject = {};
        component.utAccOpeningPostObject.profession = '';
        component.populateProfessionCode(professionList, professionCode);
        expect(professionList).toBeTruthy();
        expect(professionCode === professionList[0].occupationLongName).toBe(true);
        expect(component.utAccOpeningPostObject.profession).toBeTruthy();
        expect(component.utAccOpeningPostObject.profession).toBe(professionList[0].occupationCode);
    });
    it('should chk populateStateCode', () => {
        const stateList = [
            {
                stateCode: '01',
                stateId: 102,
                stateLongName: 'JOHOR DARUL TAKZIM',
                stateShortName: 'JOHOR',
            },
        ];
        const stateCode = 'JOHOR DARUL TAKZIM';
        component.utAccOpeningPostObject = {};
        component.utAccOpeningPostObject.state = '';
        component.populateStateCode(stateList, stateCode);
        expect(stateList).toBeTruthy();
        expect(stateCode === stateList[0].stateLongName).toBe(true);
        expect(component.utAccOpeningPostObject.state).toBeTruthy();
        expect(component.utAccOpeningPostObject.state).toBe(stateList[0].stateCode);
    });
    it('should chk populateSettlementAccount', () => {
        const settlementList = [
            {
                accountNumber: '16285729231',
                accountType: 'CIMB Current Account',
                amount: '223,242.00',
                balanceType: 'Current',
                settlementAcctType: 'C',
            },
        ];
        const bankAcctNo = '16285729231';
        component.utAccOpeningPostObject = {};
        component.utAccOpeningPostObject.settlementAcctType = '';
        component.populateSettlementAccount(settlementList, bankAcctNo);
        expect(settlementList).toBeTruthy();
        expect(bankAcctNo === settlementList[0].accountNumber).toBe(true);
        expect(component.utAccOpeningPostObject.settlementAcctType).toBeTruthy();
        expect(component.utAccOpeningPostObject.settlementAcctType).toBe(
            settlementList[0].settlementAcctType,
        );
    });

    it('should call populateRiskProfileCategory()', () => {
        component.utAccOpeningPostObject = {};
        component.utAccOpeningPostObject.riskProfile = '';
        const mockRiskProfile = 'Balanced';

        component.populateRiskProfileCategory(mockRiskProfile);

        expect(component.populateRiskProfileCategory(mockRiskProfile)).toBeTruthy();
    });

    it('should dispatch actions and navigate to cart component when step3Submited() is called', () => {
        const mockAccountOpeningAuditAPIResponse = {
            accountNo: '123',
        };

        const mockLandingPageStatus = {
            onboardingId: 6654,
        };

        const mockSettlementList = [
            { accountNumber: '123', settlementAcctType: 'type1', signingCondition: 'condition1' },
            { accountNumber: '456', settlementAcctType: 'type2', signingCondition: 'condition2' },
        ];

        const mockSelect = jest
            .fn().mockReturnValue(of(mockLandingPageStatus))
            .mockReturnValueOnce({ pipe: () => of({ accountOpeningAuditAPIResponse: mockAccountOpeningAuditAPIResponse }) });
        const mockDispatch = jest.fn();
        const mockNavigate = jest.fn();

        jest.spyOn(store, 'select').mockImplementation(mockSelect);

        jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);
        jest.spyOn(component.router, 'navigate').mockImplementation(mockNavigate);

        component.populateSettlementAccount(mockSettlementList, '123');

        component.step3Submited();

        // Assertions

        // Check if the necessary actions are dispatched

        expect(mockDispatch).toHaveBeenCalledWith(
            new AccountOpeningActions.PostAccountOpeningAuditApi({
                audit: [],
                utAccount: {
                    addresses: [
                        {
                            address1: "",
                            address2: "",
                            address3: "",
                            address4: "",
                            addressType: "2",
                            country: "",
                            postcode: "",
                            state: "",
                        },
                    ],
                    bankAcctNo: "",
                    birthDate: "",
                    clientGroup: "",
                    cntyCitizenship: "",
                    cntyIssued1: "",
                    cntyResident: undefined,
                    email: "",
                    gender: "",
                    homePhone: "",
                    idNo1: "",
                    idType1: "",
                    industry: "",
                    maritalStatus: "",
                    mobilePhone: "",
                    name: "",
                    nationality: "",
                    profession: "",
                    race: "",
                    religion: "",
                    riskprofile: "",
                    settlementAcctType: "",
                    sibsCifNo: "",
                    title: "",
                    workPhone: "",
                },
            })
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            LandingPageActions.updateAccountStatus({
                accountStatus: {
                    onboardingId: mockLandingPageStatus.onboardingId,
                    accountStatus: 'Y',
                    accountStartDate: '',
                    accountEndDate: '',
                },
            })
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            new UserAction.SelectedUnitTrustAccount(mockAccountOpeningAuditAPIResponse.accountNo)
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            new CartActions.UpdateCartUTAccount(mockAccountOpeningAuditAPIResponse.accountNo)
        );

        expect(mockNavigate).toHaveBeenCalledWith([path.CART_COMPONENTS]);

        // Check if the store subscriptions are properly cleaned up

        expect(mockSelect).toHaveBeenCalled();
    });
});
