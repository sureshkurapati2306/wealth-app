import { AsnbFund, FundDetails, PastTransaction, FundMapDetail } from '../models';

import { State } from '../+state/asnb.reducer';

export const getFundOverview = (res: any) => {
    return {
        name: res.firstName,
        uhId: res.unitHolderId,
        currentInvestment: res.grandTotalUhHoldings,
        lastUpdateDate: res.lastUpdateDate,
    };
};

export const getOwnerDetails = (res: any) => {
    return {
        membershipNumber: res.unitHolderId,
        name: res.firstName,
        value: '',
    };
};

export const formatMinorDetails = (minorDetails: any[]) => {
    if (!minorDetails) return [];
    return minorDetails.map((minor) => {
        return {
            name: minor.name,
            membershipNumber: minor.uhid,
            value: minor.uhid,
        };
    });
};

export const groupFundListByFundId = (
    payload: any,
    state: State,
): { fundDetail: FundDetails; fundTypesMap: any; fundTypeIds: any } => {
    const { lookupRes, fundRes } = payload;

    let fundTypesMap: { string: FundMapDetail[] };
    let fundTypeIds: string[];

    if (lookupRes === null) {
        fundTypesMap = state.fundTypesMap;
        fundTypeIds = state.fundTypeIds;
    } else {
        fundTypesMap = mapFundTypesById(lookupRes);
        fundTypeIds = lookupRes.map((fund) => fund.fundCode);
    }

    const groupedFundList = fundRes?.fundDetail.reduce(
        (obj: FundDetails, item: AsnbFund) => {
            const { fundId, uhAccountStatus } = item;

            // only incldue NORMAL fund
            if (uhAccountStatus !== 'NORMAL' || !fundId) {
                return obj;
            }

            const isFixPrice = fundTypesMap[fundId]?.fundType === 'fixed';

            if (isFixPrice) {
                obj.fix_price = [...obj.fix_price, item];
            } else {
                obj.variable_price = [...obj.variable_price, item];
            }

            return obj;
        },
        { fix_price: [], variable_price: [] },
    );

    return { fundDetail: groupedFundList, fundTypesMap, fundTypeIds };
};

export const groupMinorFundListByFundId = (fundList: AsnbFund[] = []): FundDetails => {
    return {
        fix_price: fundList.filter((fund) => fund.uhAccountStatus === 'NORMAL'),
    };
};

export const formatRecentTransaction = (data: PastTransaction[]) => {
    return data.map((item) => {
        return {
            ...item,
            transactionDate: new Date(
                item.transactionDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'),
            ),
        };
    });
};

export const mapFundTypesById = (fundTypes) => {
    return fundTypes.reduce((obj, item) => {
        return {
            ...obj,
            [item.fundCode]: item,
        };
    }, {});
};
