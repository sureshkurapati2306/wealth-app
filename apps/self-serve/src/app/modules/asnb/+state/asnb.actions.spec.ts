import { asnbFavouriteDetails } from '../mocks/data';
import { AsnbEligibleFunds } from '../models';
import * as AsnbActions from './asnb.actions';

describe('Asnb Actions', () => {
    it('should create an init action', () => {
        const action = AsnbActions.init();
        expect(action.type).toEqual('[Asnb Page] Init');
    });

    it('should create an asnbTopUp action', () => {
        const fundName = 'Test Fund';
        const amount = 1000;
        const fundId = 'Abc';
        const action = AsnbActions.asnbTopUp({ fundName, amount, fundId });
        expect(action.type).toEqual('[Asnb/API] Asnb Top Up');
        expect(action.fundName).toEqual(fundName);
        expect(action.amount).toEqual(amount);
    });

    it('should create a loadAsnbFundDetails action', () => {
        const options = { fundId: '1234' };
        const action = AsnbActions.loadAsnbFundDetails({ options });
        expect(action.type).toEqual('[ASNBFund/list] Load ASNB Fund Details');
        expect(action.options).toEqual(options);
    });

    it('should create a loadAsnbFundDetailsSuccess action', () => {
        const payload = { fundId: '1234', fundName: 'Test Fund' };
        const action = AsnbActions.loadAsnbFundDetailsSuccess({ payload });
        expect(action.type).toEqual('[ASNBFund/list] Load ASNB Fund Details Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadAsnbFundDetailsFailure action', () => {
        const error = new Error('Failed to load ASNB fund details');
        const action = AsnbActions.loadAsnbFundDetailsFailure({ error });
        expect(action.type).toEqual('[ASNBFund/list] Load ASNB Fund Details Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a loadAsnbMinorFundDetails action', () => {
        const options = { fundId: '1234' };
        const action = AsnbActions.loadAsnbMinorFundDetails({ options });
        expect(action.type).toEqual('[ASNBFund/list] Load ASNB Minor Fund Details');
        expect(action.options).toEqual(options);
    });

    it('should create a loadAsnbMinorFundDetailsSuccess action', () => {
        const payload = { fundId: '1234', fundName: 'Test Fund' };
        const action = AsnbActions.loadAsnbMinorFundDetailsSuccess({ payload });
        expect(action.type).toEqual('[ASNBFund/list] Load ASNB Minor Fund Details Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadTransactionLimit action', () => {
        const action = AsnbActions.loadTransactionLimit();
        expect(action.type).toEqual('[ASNBFund/list] Load Transaction Limit');
    });

    it('should create a loadTransactionLimitSuccess action', () => {
        const payload = { currentLimit: 0, maxLimit: 5000 };
        const action = AsnbActions.loadTransactionLimitSuccess({ payload });
        expect(action.type).toEqual('[ASNBFund/list] Load Transaction Limit Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadTransactionLimitFailure action', () => {
        const error = new Error('Failed to load transaction limit');
        const action = AsnbActions.loadTransactionLimitFailure({ error });
        expect(action.type).toEqual('[ASNBFund/list] Load Transaction Limit Failure');
        expect(action.error).toEqual(error);
    });

    //eligible funds
    it('should create a loadEligibleFunds action', () => {
        const payload = {
            unitHolderId: '000008492086',
        };
        const action = AsnbActions.loadEligibleFunds({ payload });
        expect(action.type).toEqual('[ASNBFund/list] Load Eligible Funds');
    });

    it('should create a loadEligibleFundsSuccess success action', () => {
        const payload: AsnbEligibleFunds = {
            eligibleFunds: ['ASB1', 'ASB2', 'ASB3'],
        };
        const action = AsnbActions.loadEligibleFundsSuccess({ payload });
        expect(action.type).toEqual('[ASNBFund/list] Load Eligible Funds Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadEligibleFundsFailure failure action', () => {
        const error = new Error('Failed to load transaction limit');
        const action = AsnbActions.loadEligibleFundsFailure({ error });
        expect(action.type).toEqual('[ASNBFund/list] Load Eligible Funds Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a loadOperationHourDetails action', () => {
        const action = AsnbActions.loadOperationHourDetails();
        expect(action.type).toEqual('[ASNB/API] Load Operation Hour Details');
    });

    it('should create a loadOperationHourSuccess action', () => {
        const payload = { startTime: '02:00', endTime: '21:00' };
        const action = AsnbActions.loadOperationHourDetailsSuccess({ payload });
        expect(action.type).toEqual('[ASNB/API] Load Operation Hour Details Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadOperationHourFailure action', () => {
        const error = new Error('Failed to load operation hour details');
        const action = AsnbActions.loadOperationHourDetailsFailure({ error });
        expect(action.type).toEqual('[ASNB/API] Load Operation Hour Details Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a loadExternalUrlList action', () => {
        const action = AsnbActions.loadExternalUrlList();
        expect(action.type).toEqual('[ASNB/API] Load External URL List');
    });

    it('should create a loadExternalUrlList success action', () => {
        const payload = { test: 'Test' };
        const action = AsnbActions.loadExternalUrlListSuccess({ payload: { test: 'Test' } });
        expect(action.type).toEqual('[ASNB/API] Load External URL List Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadExternalUrlList failure action', () => {
        const error = new Error('Failed to load URL list');
        const action = AsnbActions.loadExternalUrlListFailure({ error });
        expect(action.type).toEqual('[ASNB/API] Load External URL List Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a loadIdTypeList success action', () => {
        const payload = [
            { id: 'ID1', value: 'ID 1' },
            { id: 'ID2', value: 'ID 2' },
        ];
        const action = AsnbActions.loadIdTypeListSuccess({ payload });
        expect(action.type).toEqual('[ASNB/API] Load ID Type List Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadIdTypeList failure action', () => {
        const error = new Error('Failed to load ID type list');
        const action = AsnbActions.loadIdTypeListFailure({ error });
        expect(action.type).toEqual('[ASNB/API] Load ID Type List Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a loadRelationshipList success action', () => {
        const payload = [
            { id: 'R1', value: 'Relationship 1' },
            { id: 'R2', value: 'Relationship 2' },
        ];
        const action = AsnbActions.loadRelationshipListSuccess({ payload });
        expect(action.type).toEqual('[ASNB/API] Load Relationship List Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadRelationshipList failure action', () => {
        const error = new Error('Failed to load relationship list');
        const action = AsnbActions.loadRelationshipListFailure({ error });
        expect(action.type).toEqual('[ASNB/API] Load Relationship List Failure');
        expect(action.error).toEqual(error);
    });

    it('should create a updateAddFavouriteState action', () => {
        const payload = {
            nickname: 'nickname',
            membershipNumber: 'membershipNumber',
            fundCode: 'fundCode',
            idType: 'idType',
            idNumber: 'idNumber',
            relationship: 'relationship',
            stageId: 'stageId',
            transactionId: 'transactionId',
            timestamp: 'timestamp',
        };
        const action = AsnbActions.updateAddFavouriteState({ payload });
        expect(action.type).toEqual('[ASNB/Favourite] Update Add Favourite State');
        expect(action.payload).toEqual(payload);
    });

    it('should create a clearAddFavouriteState action', () => {
        const action = AsnbActions.clearAddFavouriteState();
        expect(action.type).toEqual('[ASNB/Favourite] Clear Add Favourite State');
    });
    it('should create a loadTransferReason action', () => {
        const action = AsnbActions.loadTransferReasonList();
        expect(action.type).toEqual('[Asnb/API] Load Asnb Transfer Reason List');
    });

    it('should create a loadTransferReasonSuccess action', () => {
        const payload = [{ id: 'SAV', value: 'Savings' }];
        const action = AsnbActions.loadTransferReasonListSuccess({ payload });
        expect(action.type).toEqual('[Asnb/API] Load Asnb Transfer Reason List Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadTransferReasonFailure action', () => {
        const error = new Error('Failed to load transfer reasons');
        const action = AsnbActions.loadTransferReasonListFailure({ error });
        expect(action.type).toEqual('[Asnb/API] Load Asnb Transfer Reason List Failure');
        expect(action.error).toEqual(error);
    });

    it('should create an asnbFavouritePurchase action', () => {
        const payload = asnbFavouriteDetails;
        const action = AsnbActions.asnbFavouritePurchase({ payload });
        expect(action.type).toEqual('[Asnb/Favourite] Asnb Favourite Purchase');
        expect(action.payload).toEqual(payload);
    });

    it('should create a clearAsnbFavouritePurchase action', () => {
        const action = AsnbActions.clearAsnbFavouritePurchase();
        expect(action.type).toEqual('[Asnb/Favourite] Asnb Clear Favourite Purchase');
    });
});
