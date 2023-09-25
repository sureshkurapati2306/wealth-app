import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { environment } from '../../../../environments/environment';

describe('AccountService', () => {
    let accountService: AccountService, httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AccountService],
        });

        accountService = TestBed.get(AccountService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should called getUserProfile', () => {
        const mockResponse = {
            bankAccounts: [
                {
                    accountType: 'CIMB Current Account',
                    accountNumber: '16285729231',
                    balanceType: 'Current',
                    amount: '223,242.00',
                    settlementAcctType: 'C',
                },
                {
                    accountType: 'CIMB Saving Account',
                    accountNumber: '75285829533',
                    balanceType: 'Current',
                    amount: '21,890.00',
                    settlementAcctType: 'I',
                },
            ],
            branchCode: '001',
            accountRelation: 'Self',
            birthDate: '2020-01-23',
            profession: '1112',
            idNo: '930505086630',
            idType: 'NEWIC',
            idCntyIssued: 'MY',
            name: 'John',
            cntyCitizenship: 'MY',
            addresses: [
                {
                    addressType: '2',
                    address1: 'Jalan Madrasah',
                    address2: 'Jalan 1/22a, Taman Melati',
                    address3: null,
                    address4: null,
                    state: 'Kuala Lumpur',
                    country: 'MY',
                    postcode: '53100',
                },
            ],
            prStatus: '0',
            customerId: 'C2123456',
            staffIndicator: '1',
            homePhone: '+60311234567',
            nationality: 'MY',
            accountStatus: 'Active',
            cardNum: '5196038000000649',
        };

        accountService.getUserProfile().subscribe((userProfile) => {
            expect(userProfile).toBeTruthy();
            expect(userProfile['name']).toEqual('John');
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.ut + '/customer/');

        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should called postAccountOpening', () => {
        const mockRequest = {
            clientGroup: 'SF',
            clientSegment: 'MASS',
            title: 'Mr',
            name: 'Irfan',
            idNo1: '940101990008',
            idType1: '002',
            cntyIssued1: 'MY',
            birthDate: '11 June 1984',
            addresses: [
                {
                    addressType: '2',
                    address1: 'QWERTTY',
                    address2: 'WEAFRESW',
                    address3: 'FGS',
                    address4: '53300 CG',
                    state: '14',
                    country: 'MY',
                    postcode: '53300',
                },
            ],
            email: 'unitunit123@gmail.com',
            mobilePhone: '0167812333',
            homePhone: '0392001727',
            workPhone: '0392008676',
            maritalStatus: 'S',
            nationality: 'MY',
            gender: 'M',
            race: 'C',
            industry: '0113X',
            religion: '02',
            cntyResident: '1',
            profession: '1112',
            openBranch: '1408',
            settlementAcctType: 'C',
            bankAcctNo: '7058083543',
            jointAcctInd: 'S',
            authorizedSign: 'Yes',
        };

        accountService.postAccountOpening(mockRequest).subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result['status']).toEqual('Success');
        });

        const mockUrl = environment.apiUrl + environment.ut  + '/utaccount';
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.urlWithParams).toBe(mockUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockRequest);
        req.flush({ status: 'Success', accountNo: 'A80119992' });

        httpTestingController.verify();
    });

    it('should called postCustomerDetails', () => {
        const postParam = {
            bankId: '',
            branchId: '',
            cif: '10110000120648',
            orgnFormRefId: '',
        };

        const mockResult = {
            bankAccounts: [
                {
                    accountType: 'CIMB Current Account',
                    accountNumber: '8004321188',
                    balanceType: null,
                    amount: null,
                    settlementAcctType: null,
                },
            ],
            branchCode: null,
            accountRelation: null,
            birthDate: '16 July 1972',
            profession: null,
            idNo: '721231075485',
            idType: 'new IC',
            idCntyIssued: 'MYS',
            name: 'MNMOQC LET NPPET LML',
            cntyCitizenship: '0',
            addresses: [
                {
                    addressType: 'Primary',
                    address1: 'PQFLR 1-35-94',
                    address2: 'FRFF PFVEPFF MQFSL',
                    address3: 'PVUP DLFSPJJVP',
                    address4: '',
                    state: '07',
                    country: 'MYS',
                    postcode: '11100',
                },
            ],
            prStatus: null,
            customerId: null,
            staffIndicator: null,
            homePhone: null,
            nationality: 'MYS',
            accountStatus: null,
            cardNum: null,
            gender: 'M',
            race: 'C',
            maritalStatus: 'S',
            religion: 'B',
            email: ' ',
            cifNo: '10110000120648',
            clientGroup: 'N',
        };

        accountService.postCustomerDetails().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result['idNo']).toEqual('721231075485');
        });

        const mockUrl = environment.apiUrl + environment.wealth  + '/customerdetails';
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.urlWithParams).toBe(mockUrl);
        expect(req.request.method).toEqual('POST');

        req.flush(mockResult);

        httpTestingController.verify();
    });

    it('should called getCifInquiry', () => {

        const mockResult = {
            cardNum: '5196038000000649',
            phoneType: 'Mobile Phone',
            phoneNumber: '60107725399',
        };

        accountService.getCifInquiry().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result['phoneNumber']).toEqual('60107725399');
        });

        const mockUrl = environment.apiUrl + environment.wealth  + '/cifinquiry';
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.urlWithParams).toBe(mockUrl);
        expect(req.request.method).toEqual('GET');

        req.flush(mockResult);

        httpTestingController.verify();
    });

    it('should called getAccountDetail', () => {
        const mockResponse = {
                "deviation_level": "0.0",
                "current_investment": "0.00",
                "deviation_value": "0.00",
                "soleprop_ind": "N",
                "risk_profile": "BALANCED",
                "asset_class": [
                    {
                        "holding": "0.0",
                        "asset_class_name": "Cash",
                        "classHexa": "#B3BE66",
                        "class_seq": 1,
                        "recommended": "10.0"
                    },
                    {
                        "holding": "0.0",
                        "asset_class_name": "Fixed Income",
                        "classHexa": "#567DCC",
                        "class_seq": 2,
                        "recommended": "36.0"
                    },
                    {
                        "holding": "0.0",
                        "asset_class_name": "Local Equity",
                        "classHexa": "#5CD3CD",
                        "class_seq": 3,
                        "recommended": "32.0"
                    },
                    {
                        "holding": "0.0",
                        "asset_class_name": "Regional Equity",
                        "classHexa": "#955CD6",
                        "class_seq": 4,
                        "recommended": "10.0"
                    },
                    {
                        "holding": "0.0",
                        "asset_class_name": "Global Equity",
                        "classHexa": "#D45DBA",
                        "class_seq": 5,
                        "recommended": "10.0"
                    },
                    {
                        "holding": "0.0",
                        "asset_class_name": "Alternative",
                        "classHexa": "#4FA14F",
                        "class_seq": 6,
                        "recommended": "2.0"
                    }
                ],
                "total_percentage": "0.00",
                "total_invested": "0.00",
                "recommended": [
                    {
                        "name": "Cash",
                        "classHexa": "#B3BE66",
                        "y": 10.0
                    },
                    {
                        "name": "Fixed Income",
                        "classHexa": "#567DCC",
                        "y": 36.0
                    },
                    {
                        "name": "Local Equity",
                        "classHexa": "#5CD3CD",
                        "y": 32.0
                    },
                    {
                        "name": "Regional Equity",
                        "classHexa": "#955CD6",
                        "y": 10.0
                    },
                    {
                        "name": "Global Equity",
                        "classHexa": "#D45DBA",
                        "y": 10.0
                    },
                    {
                        "name": "Alternative",
                        "classHexa": "#4FA14F",
                        "y": 2.0
                    }
                ],
                "foreigner_ind": "N",
                "total_return": "0.00",
                "holding": [
                    {
                        "name": "Cash",
                        "classHexa": "#B3BE66",
                        "y": 0.0
                    },
                    {
                        "name": "Fixed Income",
                        "classHexa": "#567DCC",
                        "y": 0.0
                    },
                    {
                        "name": "Local Equity",
                        "classHexa": "#5CD3CD",
                        "y": 0.0
                    },
                    {
                        "name": "Regional Equity",
                        "classHexa": "#955CD6",
                        "y": 0.0
                    },
                    {
                        "name": "Global Equity",
                        "classHexa": "#D45DBA",
                        "y": 0.0
                    },
                    {
                        "name": "Alternative",
                        "classHexa": "#4FA14F",
                        "y": 0.0
                    }
                ],
                "occupation_ind": "N",
                "casa_account": [
                    {
                        "casa_account_format": "CURRENT ACCOUNT 8007221977 (Balance MYR 67.79)",
                        "casa_account_balance": 67.79,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCOUNT",
                        "account_status": "A",
                        "casa_account_no": "8007221977"
                    },
                    {
                        "casa_account_format": "CURRENT ACCOUNT 8007221989 (Balance MYR 13177.65)",
                        "casa_account_balance": 13177.65,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCOUNT",
                        "account_status": "A",
                        "casa_account_no": "8007221989"
                    },
                    {
                        "casa_account_format": "CURRENT ACCOUNT 8007222017 (Balance MYR 25.55)",
                        "casa_account_balance": 25.55,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCOUNT",
                        "account_status": "A",
                        "casa_account_no": "8007222017"
                    },
                    {
                        "casa_account_format": "CURRENT ACCOUNT 8007222029 (Balance MYR 392110.80)",
                        "casa_account_balance": 392110.8,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCOUNT",
                        "account_status": "A",
                        "casa_account_no": "8007222029"
                    },
                    {
                        "casa_account_format": "CIMB MONEY MULTIPLIE 8007229109 (Balance MYR 26338.26)",
                        "casa_account_balance": 26338.26,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB MONEY MULTIPLIE",
                        "account_status": "A",
                        "casa_account_no": "8007229109"
                    },
                    {
                        "casa_account_format": "CIMB MONEY MULTIPLIE 8007229111 (Balance MYR 11094.79)",
                        "casa_account_balance": 11094.79,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB MONEY MULTIPLIE",
                        "account_status": "A",
                        "casa_account_no": "8007229111"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229123 (Balance MYR 700.00)",
                        "casa_account_balance": 700.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229123"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229135 (Balance MYR 9990.37)",
                        "casa_account_balance": 9990.37,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229135"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER 8007229442 (Balance MYR 500.00)",
                        "casa_account_balance": 500.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER",
                        "account_status": "A",
                        "casa_account_no": "8007229442"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER 8007229454 (Balance MYR 1000.00)",
                        "casa_account_balance": 1000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER",
                        "account_status": "A",
                        "casa_account_no": "8007229454"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER 8007229466 (Balance MYR 1000.00)",
                        "casa_account_balance": 1000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER",
                        "account_status": "A",
                        "casa_account_no": "8007229466"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER 8007229478 (Balance MYR 1500.00)",
                        "casa_account_balance": 1500.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER",
                        "account_status": "A",
                        "casa_account_no": "8007229478"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER 8007229492 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER",
                        "account_status": "A",
                        "casa_account_no": "8007229492"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229509 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229509"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229511 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229511"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229523 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229523"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229535 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229535"
                    },
                    {
                        "casa_account_format": "CIMB TRADER DEPOSIT 8007229547 (Balance MYR 5000.00)",
                        "casa_account_balance": 5000.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CIMB TRADER DEPOSIT",
                        "account_status": "A",
                        "casa_account_no": "8007229547"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER PLUS 8007229559 (Balance MYR 970.00)",
                        "casa_account_balance": 970.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER PLUS",
                        "account_status": "A",
                        "casa_account_no": "8007229559"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER PLUS 8007229561 (Balance MYR 970.00)",
                        "casa_account_balance": 970.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER PLUS",
                        "account_status": "A",
                        "casa_account_no": "8007229561"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER PLUS 8007229573 (Balance MYR 4970.00)",
                        "casa_account_balance": 4970.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER PLUS",
                        "account_status": "A",
                        "casa_account_no": "8007229573"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER PLUS 8007229585 (Balance MYR 970.00)",
                        "casa_account_balance": 970.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER PLUS",
                        "account_status": "A",
                        "casa_account_no": "8007229585"
                    },
                    {
                        "casa_account_format": "CLICKS TRADER PLUS 8007229597 (Balance MYR 4970.00)",
                        "casa_account_balance": 4970.0,
                        "joint_indicator": "O",
                        "casa_account_name": "CLICKS TRADER PLUS",
                        "account_status": "A",
                        "casa_account_no": "8007229597"
                    },
                    {
                        "casa_account_format": "CURRENT ACCT-i 8602071345 (Balance MYR 10140.10)",
                        "casa_account_balance": 10140.1,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "8602071345"
                    },
                    {
                        "casa_account_format": "CURRENT ACCT-i 8602071402 (Balance MYR 10140.10)",
                        "casa_account_balance": 10140.1,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "8602071402"
                    },
                    {
                        "casa_account_format": "CURRENT ACCT-i 8602071414 (Balance MYR 9734.13)",
                        "casa_account_balance": 9734.13,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "8602071414"
                    },
                    {
                        "casa_account_format": "CURRENT ACCT-i 8602071426 (Balance MYR 10140.10)",
                        "casa_account_balance": 10140.1,
                        "joint_indicator": "O",
                        "casa_account_name": "CURRENT ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "8602071426"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055705900 (Balance MYR 9000.63)",
                        "casa_account_balance": 9000.63,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055705900"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055705912 (Balance MYR 8731.81)",
                        "casa_account_balance": 8731.81,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055705912"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055705936 (Balance MYR 8711.78)",
                        "casa_account_balance": 8711.78,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055705936"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055705948 (Balance MYR 9000.63)",
                        "casa_account_balance": 9000.63,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055705948"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055709784 (Balance MYR 10051.72)",
                        "casa_account_balance": 10051.72,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055709784"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055710110 (Balance MYR 10051.64)",
                        "casa_account_balance": 10051.64,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055710110"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055711343 (Balance MYR 11060.16)",
                        "casa_account_balance": 11060.16,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055711343"
                    },
                    {
                        "casa_account_format": "JUNIOR SA 7055711836 (Balance MYR 10946.28)",
                        "casa_account_balance": 10946.28,
                        "joint_indicator": "M",
                        "casa_account_name": "JUNIOR SA",
                        "account_status": "A",
                        "casa_account_no": "7055711836"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK 7055713228 (Balance MYR 10051.53)",
                        "casa_account_balance": 10051.53,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK",
                        "account_status": "A",
                        "casa_account_no": "7055713228"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK ACCT-i 7612670667 (Balance MYR 98930.60)",
                        "casa_account_balance": 98930.6,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "7612670667"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK ACCT-i 7612670679 (Balance MYR 22137.06)",
                        "casa_account_balance": 22137.06,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "7612670679"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK ACCT-i 7612670681 (Balance MYR 10278.70)",
                        "casa_account_balance": 10278.7,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "7612670681"
                    },
                    {
                        "casa_account_format": "SA PASSBOOK ACCT-i 7612670693 (Balance MYR 10278.70)",
                        "casa_account_balance": 10278.7,
                        "joint_indicator": "O",
                        "casa_account_name": "SA PASSBOOK ACCT-i",
                        "account_status": "A",
                        "casa_account_no": "7612670693"
                    }
                ],
                "fund_list": [],
                "risk_description": "I want to receive regular income and capital growth. I am willing to lose a small amount of my capital.",
                "name": "RCCP024 860907036950",
                "staff_ind": null,
                "deviation_msg": "0.0",
                "ut_account": [],
                "casa_ind": "Y",
                "scheduler_msg": "Transactions performed after 2pm will be executed the next business day",
                "last_update_date": "20 May 2022, 12:55 AM"
            }

            const custIdMock = '880318145905';
            const cifNumMock = '10280000511312';

            accountService.getAccountDetail(custIdMock, cifNumMock).subscribe((result) => {
                expect(result).toBeTruthy();
                expect(result[0]).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(environment.apiUrl + environment.emanager + '/account/getAccountDetail/' + custIdMock + '/' + cifNumMock);
            expect(req.request.method).toEqual('GET');
            req.flush(mockResponse);

            httpTestingController.verify();
    })

    it('should post postAccountOpeningAudit', () => {
        const mockRequest = {
            "utAccount": {
                "clientGroup": "SF",
                "clientSegment": "MASS",
                "title": "Mr",
                "name": "Irfan",
                "idNo1": "940101990008",
                "idType1": "002",
                "cntyIssued1": "MY",
                "birthDate": "11 June 1984",
                "addresses": [
                    {
                        "addressType": "2",
                        "address1": "QWERTTY",
                        "address2": "WEAFRESW",
                        "address3": "FGS",
                        "address4": "53300 CG",
                        "state": "14",
                        "country": "MY",
                        "postcode": "53300"
                    }
                ],
                "email": "unitunit123@gmail.com",
                "mobilePhone": "0167812333",
                "homePhone": "0392001727",
                "workPhone": "0392008676",
                "maritalStatus": "S",
                "nationality": "MY",
                "gender": "Male",
                "race": "C",
                "industry": "0113X",
                "religion": "02",
                "cntyResident": "MY",
                "profession": "1112",
                "openBranch": "1408",
                "settlementAcctType": "C",
                "bankAcctNo": "7058083543",
                "jointAcctInd": "S",
                "authorizedSign": "Yes"
            },
            "audit": {
                "moduleName": "UT Account",
                "eventName": "Post All Transactions",
                "channelName": "Web Browser",
                "browserName": "Chrome",
                "osVersion": "Win10",
                "ipAddress": "12.1.2.1"
            }
        }

        const mockResponse = {
            "status": "Success",
            "accountNo": "A80120053"
        }

        accountService.postAccountOpeningAudit(mockRequest).subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const mockUrl = environment.apiUrl + environment.wealth +'/utaccount-audit';
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.urlWithParams).toBe(mockUrl);
        expect(req.request.method).toEqual('POST');

        req.flush(mockResponse);

        httpTestingController.verify();


    })

    it('should get getPostCodeList', () => {
        const mockResponse = {
            postcodeId: 104,
            postcodeStart: 1000,
            postcodeEnd: 2999,
            postcodeShortName: 'TCJ',
            stateId: 110,
            createdBy: null,
            modifiedBy: null,
            createdDate: '2022-01-18T06:31:54.000+00:00',
            modifiedDate: null,
        };
        accountService.getPostCodeList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/postcodes');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getRaceList', () => {
        const mockResponse = {
            raceId: 102,
            raceCode: 'B',
            raceShortName: 'Bumiputra',
            raceLongName: 'Bumiputra',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T04:27:00.000+00:00',
            modifiedDate: '2021-10-08T04:27:00.000+00:00',
        };

        accountService.getRaceList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/races');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getCitizenList', () => {
        const mockResponse = {
            citizenId: 103,
            citizenCode: '1',
            citizenStatus: 'Y',
            citizenShortName: 'Permanent Resident',
            citizenLongName: 'Permanent Resident',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-11T06:58:07.000+00:00',
            modifiedDate: '2021-10-11T06:58:07.000+00:00',
        };

        accountService.getCitizenList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/citizens');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getCountryList', () => {
        const mockResponse = {
            countryId: 102,
            countryCode: 'AB',
            countryNo: 0,
            countryShortName: 'ADEN',
            countryLongName: 'Aden',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T04:03:51.000+00:00',
            modifiedDate: '2021-10-08T04:03:51.000+00:00',
        };

        accountService.getCountryList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/countrys');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getGenderList', () => {
        const mockResponse = {
            genderId: 102,
            genderCode: 'F',
            genderShortName: 'Female',
            genderLongName: 'Female',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T02:53:02.000+00:00',
            modifiedDate: '2021-10-08T02:53:02.000+00:00',
        };

        accountService.getGenderList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/genders');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getIndustryList', () => {
        const mockResponse = {
            employmentId: 102,
            employmentCode: '01120',
            employmentShortName: 'Agriculture - Growing of paddy',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T06:42:28.000+00:00',
            modifiedDate: '2021-10-08T06:42:28.000+00:00',
        };

        accountService.getIndustryList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/employments');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getMartialStatusList', () => {
        const mockResponse = {
            maritalId: 102,
            maritalCode: 'D',
            maritalShortName: 'Divorced',
            maritalLongName: 'Divorced',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T02:59:55.000+00:00',
            modifiedDate: '2021-10-08T02:59:55.000+00:00',
        };

        accountService.getMartialStatusList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/maritals');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getProfessionList', () => {
        const mockResponse = {
            occupationId: 102,
            occupationCode: 'U00X',
            occupationShortName: 'OthO/sideLabourForce',
            occupationLongName: 'Other Outside Labour Force',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T03:44:25.000+00:00',
            modifiedDate: '2021-10-08T03:44:25.000+00:00',
        };

        accountService.getProfessionList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/occupations');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getReligionList', () => {
        const mockResponse = {
            religionId: 102,
            religionCode: 'B',
            religionShortName: 'Buddhist',
            religionLongName: 'Buddhist',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T03:03:10.000+00:00',
            modifiedDate: '2021-10-08T03:03:10.000+00:00',
        };

        accountService.getReligionList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/religions');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getStateList', () => {
        const mockResponse = {
            stateId: 102,
            countryCode: 'MY',
            stateCode: '01',
            stateShortName: 'JOHOR',
            stateLongName: 'Johor Darul Takzim',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T06:39:48.000+00:00',
            modifiedDate: '2021-10-08T06:39:48.000+00:00',
        };

        accountService.getStateList().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/states');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should get getTitleSalutations', () => {
        const mockResponse = {
            salutationId: 102,
            salutationCode: '01',
            salutationType: 'B',
            salutationShortName: 'MR',
            salutationLongName: 'Mr',
            createdBy: null,
            modifiedBy: null,
            createdDate: '2021-10-08T03:07:15.000+00:00',
            modifiedDate: '2021-10-08T03:07:15.000+00:00',
        };

        accountService.getTitleSalutations().subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result[0]).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(environment.apiUrl + environment.wealth + '/salutations');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpTestingController.verify();
    });

    it('should called contactFromMultipleSources', () => {
        const parameter = '';

        const resObject = {
            titleSalutations: accountService.getTitleSalutations[0] || [],
            countryList: accountService.getCountryList[1] || [],
            stateList: accountService.getStateList[2] || [],
            citizenList: accountService.getCitizenList[3] || [],
            genderList: accountService.getGenderList[4] || [],
            raceList: accountService.getRaceList[5] || [],
            religionList: accountService.getReligionList[6] || [],
            martialStatusList: accountService.getMartialStatusList[7] || [],
            industryList: accountService.getIndustryList[8] || [],
            professionList: accountService.getProfessionList[9] || [],
            postCodeList: accountService.getPostCodeList[10] || [],
        };

        accountService.contactFromMultipleSources(parameter).subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result).toEqual(resObject);
        });
    });
});
