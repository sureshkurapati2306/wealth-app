import {
    getOwnerDetails,
    formatMinorDetails,
    groupFundListByFundId,
    getFundOverview,
    groupMinorFundListByFundId,
    formatRecentTransaction,
} from './fund.helper';

import { initialState } from '../+state/asnb.reducer';

describe('getOwnerDetails', () => {
    it('should return an object with membershipNumber and name properties', () => {
        const res = {
            unitHolderId: '123456',
            firstName: 'John',
            lastName: 'Doe',
        };
        const expected = {
            membershipNumber: '123456',
            name: 'John',
            value: '',
        };
        expect(getOwnerDetails(res)).toEqual(expected);
    });
});

describe('formatMinorDetails', () => {
    it('should return an array of objects with name and membershipNumber properties', () => {
        const minorDetails = [
            { name: 'Jane', uhid: '789' },
            { name: 'Bob', uhid: '456' },
        ];
        const expected = [
            { name: 'Jane', membershipNumber: '789', value: '789' },
            { name: 'Bob', membershipNumber: '456', value: '456' },
        ];
        expect(formatMinorDetails(minorDetails)).toEqual(expected);
    });

    it('should return an empty array if minorDetails is undefined', () => {
        expect(formatMinorDetails(undefined)).toEqual([]);
    });
});

describe('groupFundListByFundId', () => {
    const state = {
        ...initialState,
        fundTypesMap: {},
        fundTypeIds: [],
    };
    const payload = {
        lookupRes: [
            { fundCode: 'ASB', fundType: 'fixed' },
            { fundCode: 'ASN2', fundType: 'variable' },
            { fundCode: 'ASB2', fundType: 'fixed' },
            { fundCode: 'ASNS02', fundType: 'variable' },
            { fundCode: 'AASSGD', fundType: 'variable' },
        ],
        fundRes: {
            fundDetail: [
                { fundId: 'ASB', uhAccountStatus: 'NORMAL' },
                { fundId: 'ASN2', uhAccountStatus: 'NORMAL' },
                { fundId: 'ASB2', uhAccountStatus: 'PENDING' },
                { fundId: 'ASNS02', uhAccountStatus: 'PENDING' },
                { fundId: 'AASSGD', uhAccountStatus: 'NORMAL' },
            ],
        },
    };

    const payloadSecondTime = {
        lookupRes: null,
        fundRes: {
            fundDetail: [
                { fundId: 'ASB', uhAccountStatus: 'NORMAL' },
                { fundId: 'ASN2', uhAccountStatus: 'NORMAL' },
                { fundId: 'ASB2', uhAccountStatus: 'PENDING' },
                { fundId: 'ASNS02', uhAccountStatus: 'PENDING' },
                { fundId: 'AASSGD', uhAccountStatus: 'NORMAL' },
            ],
        },
    };

    const expectedFundTypesMap = {
        fundTypesMap: {
            ASB: { fundCode: 'ASB', fundType: 'fixed' },
            ASN2: { fundCode: 'ASN2', fundType: 'variable' },
            ASB2: { fundCode: 'ASB2', fundType: 'fixed' },
            ASNS02: { fundCode: 'ASNS02', fundType: 'variable' },
            AASSGD: { fundCode: 'AASSGD', fundType: 'variable' },
        },
        fundTypeIds: ['ASB', 'ASN2', 'ASB2', 'ASNS02', 'AASSGD'],
    };

    const initialStateWithFundTypesMap = {
        ...expectedFundTypesMap,
        fundDetail: [],
    };

    const stateWithFundTypes = {
        ...state,
        ...expectedFundTypesMap,
    };

    it('should group funds by fundId and filter uhAccountStatus equal to NORMAL', () => {
        const expected = {
            fundDetail: {
                fix_price: [{ fundId: 'ASB', uhAccountStatus: 'NORMAL' }],
                variable_price: [
                    { fundId: 'ASN2', uhAccountStatus: 'NORMAL' },
                    { fundId: 'AASSGD', uhAccountStatus: 'NORMAL' },
                ],
            },
            ...expectedFundTypesMap,
        };
        expect(groupFundListByFundId(payload, state)).toEqual(expected);
    });

    it('should group minor funds by fundId and filter uhAccountStatus equal to NORMAL', () => {
        const fundList: any = [
            { fundId: 'ASB', uhAccountStatus: 'NORMAL' },
            { fundId: 'ASB2', uhAccountStatus: 'NORMAL' },
            { fundId: 'ASM', uhAccountStatus: 'PENDING' },
            { fundId: 'ASW2020', uhAccountStatus: 'PENDING' },
        ];
        const expected = {
            fix_price: [
                { fundId: 'ASB', uhAccountStatus: 'NORMAL' },
                { fundId: 'ASB2', uhAccountStatus: 'NORMAL' },
            ],
        };
        expect(groupMinorFundListByFundId(fundList)).toEqual(expected);
    });

    it('should return an object with empty arrays if fundList is empty', () => {
        const emptyFundPayload = {
            ...payload,
            fundRes: {
                fundDetail: [],
            },
        };
        const expected = {
            fundDetail: {
                fix_price: [],
                variable_price: [],
            },
            ...expectedFundTypesMap,
        };
        expect(groupFundListByFundId(emptyFundPayload, state)).toEqual(expected);
    });
    it('should return data fund details without fund type details', () => {
        const expected = {
            ...expectedFundTypesMap,
            fundDetail: {
                fix_price: [{ fundId: 'ASB', uhAccountStatus: 'NORMAL' }],
                variable_price: [
                    { fundId: 'ASN2', uhAccountStatus: 'NORMAL' },
                    { fundId: 'AASSGD', uhAccountStatus: 'NORMAL' },
                ],
            },
        };
        expect(groupFundListByFundId(payloadSecondTime, stateWithFundTypes)).toEqual(expected);
    });
});

describe('getFundOverview', () => {
    it('should return the correct object', () => {
        const res = {
            unitHolderId: '123456',
            firstName: 'John',
            grandTotalUhHoldings: 111,
            lastUpdateDate: '2022-03-28',
        };

        const expectedOutput = {
            name: 'John',
            uhId: '123456',
            currentInvestment: 111,
            lastUpdateDate: '2022-03-28',
        };

        expect(getFundOverview(res)).toEqual(expectedOutput);
    });
});

describe('formatRecentTransaction', () => {
    it('should format transaction date correctly', () => {
        const mockData = [
            {
                transactionAmount: '123456',
                transactionDate: '22/04/2023',
                transactionType: 'e-Channels',
            },
        ];

        const formattedData = formatRecentTransaction(mockData);

        expect(formattedData).toEqual([
            {
                transactionAmount: '123456',
                transactionDate: new Date('2023/04/22'),
                transactionType: 'e-Channels',
            },
        ]);
    });
});
