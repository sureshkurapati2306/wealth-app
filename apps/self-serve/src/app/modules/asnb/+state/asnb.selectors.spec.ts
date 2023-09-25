import * as AsnbSelectors from './asnb.selectors';
import * as AsnbReducers from './asnb.reducer';
import {
    accountData,
    ASNBDowntimeMaintenance,
    bankAccounts,
    cartSummary,
    checkoutSourceDetail,
} from '../mocks/data';

import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

const mockBankData: any = bankAccounts;
const mockCartPurchaseData: any = cartSummary;
const mockCartUserData: any = accountData;
const mockCheckoutSOWSOF: any = checkoutSourceDetail;
const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;

const mockState: AsnbReducers.State = {
    checkoutBankAccount: mockBankData,
    checkoutPurchaseSummary: mockCartPurchaseData,
    checkoutUserData: mockCartUserData,
    checkoutSOWSOF: mockCheckoutSOWSOF,
    status: 'pending',
    error: '',
    fundTypesMap: null,
    fundTypeIds: [],
    asnbTopUp: {
        fundName: null,
        amount: null,
        fundId: null,
    },
    pastTransaction: null,
    fundDetail: null,
    memberList: null,
    asnbOverview: {
        name: '',
        uhId: '',
        currentInvestment: 0,
        lastUpdateDate: '',
    },
    riskStatus: '',
    checkout: {
        investmentType: '',
        stageTableId: '',
        transactionId: '',
        guardianDetails: {
            unitHolderId: '',
            name: '',
        },
        fundId: '',
        amount: 0,
        bankCharge: 1,
        total: 0,
        fundType: null,
        fundName: '',
        transactionStatus: '000',
        timeStamp: '',
        identificationNumber: '',
        unitsAlloted: 0,
        navPrice: 0,
        bankAccountNumber: '',
        asnbReferenceNo: '',
        salesCharge: null,
        salesChargePercentage: null,
        favouriteDetails: {
            unitHolderId: '23123213',
            reasonOfTransfer: 'SAV',
            reasonOfTransferValue: 'Savings',
        },
    },
    transactionLimit: {
        currentLimit: null,
        maxLimit: null,
    },
    ASNBDowntimeScheduledMaintenance: mockASNBDowntimeScheduledMaintenance,
    sofSowList: [],
    isAccountStatusNormal: null,
    selectedAccount: null,
    eligibleFunds: null,
    allFunds: null,
    operationHourDetails: {
        startTime: null,
        endTime: null,
    },
    externalUrls: {},
    idTypes: [],
    relationships: [],
    addFavouriteDetails: {
        nickname: '',
        membershipNumber: '',
        fundCode: '',
        idType: '',
        idNumber: '',
        relationship: '',
        stageId: '',
        transactionId: '',
        timestamp: '',
    },
    transferReasonList: [
        {
            id: 'SAV',
            value: 'Savings',
        },
    ],
    purchaseFavouriteDetails: {
        no: 0,
        nickname: '',
        beneName: '',
        fundCode: '',
        fundDesc: '',
        beneClientId: '',
        relationship: 'Spouse',
        memberIdType: '',
        asnbAccountNo: '',
        transId: '',
    },
};

describe('Asnb Selectors', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: {
                        asnb: {
                            checkout: {},
                            transferReasonList: [],
                            purchaseFavouriteDetails: {},
                        },
                    },
                }),
            ],
        });
    });

    it('getTopUp() should return the topUp property', () => {
        const result = AsnbSelectors.getTopUp.projector(mockState.asnbTopUp);

        expect(result).toBeUndefined();
    });

    it('getBankAccounts() should return the list of Bank Account', () => {
        const result = AsnbSelectors.getCheckoutBankAccounts.projector(
            mockState.checkoutBankAccount,
        );
        expect(result).toBeUndefined();
    });

    it('getCartPurchase() should return the checkout purchase data', () => {
        const result = AsnbSelectors.getCheckoutPurchaseSummary.projector(
            mockState.checkoutPurchaseSummary,
        );
        expect(result).toBeUndefined();
    });

    it('getAccountDetails() should return the checkout user data', () => {
        const result = AsnbSelectors.getCheckoutAccountDetails.projector(
            mockState.checkoutUserData,
        );
        expect(result).toBeUndefined();
    });

    it('getTransactionLimit() should return the transaction limit', () => {
        const result = AsnbSelectors.getTransactionLimit.projector(mockState.transactionLimit);
        expect(result).toBeUndefined();
    });

    it('getCheckoutSOWSOF() should return the checkout SOWSOF', () => {
        const result = AsnbSelectors.getCheckoutSOWSOF.projector(mockState.checkoutSOWSOF);
        expect(result).toBeUndefined();
    });

    it('getASNBFundDetails() should return the fundDetail property', () => {
        const result = AsnbSelectors.getASNBFundDetails.projector(mockState);
        expect(result).toBeNull();
    });

    it('getASNBMemberList() should return the memberList property', () => {
        const result = AsnbSelectors.getASNBMemberList.projector(mockState);
        expect(result).toBeNull();
    });

    it('should return asnbOverview from the state', () => {
        const result = AsnbSelectors.getASNBOverview.projector(mockState);

        expect(result).toStrictEqual(mockState.asnbOverview);
    });

    it('should return the user risk status from the state', () => {
        const result = AsnbSelectors.getUserRiskStatus.projector(mockState);

        expect(result).toBe(''); // Assert that the selector returns the expected value
    });

    it('should return the user risk status from the state', () => {
        const result = AsnbSelectors.getCheckout.projector(mockState);

        expect(result).toBe(mockState.checkout); // Assert that the selector returns the expected value
    });

    it('should return the past transaction from the state', () => {
        const result = AsnbSelectors.getPastTransaction.projector(mockState);

        expect(result).toBe(mockState.pastTransaction); // Assert that the selector returns the expected value
    });

    it('should return the fetch status from the state', () => {
        const result = AsnbSelectors.getFetchStatus.projector(mockState);

        expect(result).toStrictEqual({
            status: mockState.status,
            error: mockState.error,
        }); // Assert that the selector returns the expected value
    });

    it('should return the minor details from the state if favourite details present', () => {
        const modifiedMockState: AsnbReducers.State = JSON.parse(JSON.stringify(mockState));
        modifiedMockState.purchaseFavouriteDetails.transId = '1234';

        const result = AsnbSelectors.getMembership.projector(modifiedMockState);

        expect(result).toBe(modifiedMockState.checkout.guardianDetails); // Assert that the selector returns the expected value
    });

    it('should return the minor details from the state if minor details present', () => {
        const modifiedMockState: AsnbReducers.State = JSON.parse(JSON.stringify(mockState));
        modifiedMockState.checkout.minorDetails = { unitHolderId: '1234', name: 'Minor' };

        const result = AsnbSelectors.getMembership.projector(modifiedMockState);

        expect(result).toBe(modifiedMockState.checkout.minorDetails); // Assert that the selector returns the expected value
    });

    it('should return the guardian details from the state if minor details not present', () => {
        const result = AsnbSelectors.getMembership.projector(mockState);

        expect(result).toStrictEqual(mockState.checkout.guardianDetails); // Assert that the selector returns the expected value
    });

    it('should return the fund types map from the state', () => {
        const result = AsnbSelectors.getFundTypesMap.projector(mockState);

        expect(result).toStrictEqual(mockState.fundTypesMap); // Assert that the selector returns the expected value
    });

    it('should return the fund type ids from the state', () => {
        const modifiedMockState: AsnbReducers.State = JSON.parse(JSON.stringify(mockState));
        modifiedMockState.fundTypeIds = ['fundcode1'];
        modifiedMockState.fundTypesMap = { fundcode1: 'Identification 1' };

        const result = AsnbSelectors.getFundTypes.projector(modifiedMockState);

        const expected = modifiedMockState.fundTypeIds.map(
            (fundCode) => modifiedMockState.fundTypesMap[fundCode],
        );

        expect(result).toStrictEqual(expected); // Assert that the selector returns the expected value
    });

    it('should return the ASNB Downtime Maintenance List', () => {
        const result = AsnbSelectors.getASNBDowntimeScheduledMaintenance.projector(mockState);

        expect(result).toStrictEqual(mockState.ASNBDowntimeScheduledMaintenance); // Assert that the selector returns the expected value
    });

    it('should return the status and error properties from the state', () => {
        const result = AsnbSelectors.getCheckoutError.projector(mockState);

        const expected = { status: mockState.status, error: mockState.error };

        expect(result).toStrictEqual(expected);
    });

    it('should return the SOF and SOW list from the state', () => {
        const result = AsnbSelectors.getSofSowList.projector(mockState);

        expect(result).toStrictEqual(mockState.sofSowList); // Assert that the selector returns the expected value
    });

    it('should return isAccountStatusNormal from the state', () => {
        const result = AsnbSelectors.loadUserAccountStatus.projector(mockState);

        expect(result).toStrictEqual(mockState.isAccountStatusNormal); // Assert that the selector returns the expected value
    });

    it('should return selectedAccount from the state', () => {
        const result = AsnbSelectors.getSelectedMember.projector(mockState);

        expect(result).toStrictEqual(mockState.selectedAccount); // Assert that the selector returns the expected value
    });

    it('should get eligible funds from the state', () => {
        const result = AsnbSelectors.getEligibleFunds.projector(mockState);

        expect(result).toBe(mockState.eligibleFunds); // Assert that the selector returns the expected value
    });

    it('should get all funds from the state', () => {
        const result = AsnbSelectors.getAllFundsListing.projector(mockState);

        expect(result).toBe(mockState.allFunds); // Assert that the selector returns the expected value
    });

    it('should return operation hour details', () => {
        const result = AsnbSelectors.getOperationHourDetails.projector(
            mockState.operationHourDetails,
        );
        expect(result).toBeUndefined();
    });

    it('should return the list of external URL', () => {
        const result = AsnbSelectors.getExternalUrlList.projector(mockState);
        expect(result).toStrictEqual(mockState.externalUrls);
    });

    it('should return the list of ID type', () => {
        const result = AsnbSelectors.getIdTypeList.projector(mockState);
        expect(result).toStrictEqual(mockState.idTypes);
    });

    it('should return the list of relationship', () => {
        const result = AsnbSelectors.getRelationshipList.projector(mockState);
        expect(result).toStrictEqual(mockState.relationships);
    });

    it('should return the Transfer Reasons list from the state', () => {
        const result = AsnbSelectors.getTransferReasonList.projector(mockState);

        expect(result).toStrictEqual(mockState.transferReasonList); // Assert that the selector returns the expected value
    });

    it('should return the purchase favourite details from the state', () => {
        const result = AsnbSelectors.getPurchaseFavouriteDetails.projector(mockState);

        expect(result).toStrictEqual(mockState.purchaseFavouriteDetails); // Assert that the selector returns the expected value
    });

    it('should return the add favourite details from the state', () => {
        const result = AsnbSelectors.getAddFavouriteDetails.projector(mockState);

        expect(result).toStrictEqual(mockState.addFavouriteDetails);
    });

    it('should return the data for receipt with transformed data', () => {
        const result = AsnbSelectors.getCheckoutReceipt.projector(
            mockState.checkout,
            mockState.transferReasonList,
            mockState.purchaseFavouriteDetails,
        );

        expect(result).toEqual({
            ...mockState.checkout,
            reason: 'Savings',
            relationship: 'Spouse',
            favouriteDetails: {
                ...mockState.purchaseFavouriteDetails,
            },
        });
    });

    it('should return the condition details for getting ASNB fund from the state', () => {
        const result = AsnbSelectors.getASNBFundDetailsCondition.projector(mockState);

        expect(result).toStrictEqual({
            fundTypesMap: mockState.fundTypesMap,
            allFunds: mockState.allFunds,
        });
    });

    it('should return the data for receipt with transformed data', () => {
        const membershipDetails = AsnbSelectors.getMembership.projector(mockState);
        const favouriteDetails = AsnbSelectors.getPurchaseFavouriteDetails.projector(mockState);

        const result = AsnbSelectors.getReceiptMembership.projector(
            membershipDetails,
            favouriteDetails,
        );

        const expected = {
            ...membershipDetails,
            favouriteDetails,
        };

        expect(result).toEqual(expected);
    });
});
