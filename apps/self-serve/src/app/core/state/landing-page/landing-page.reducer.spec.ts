import * as LandingPageActions from './landing-page.actions';
import { initialState, reducer } from './landing-page.reducer';

export const landingPageFeatureKey = 'landingPage';

describe('LandingPage Reducer', () => {
    const landingPage = {
        landingPageStatus: {
            onboardingId: null,
            clientId: "",
            clientIdType: 'NTP',
            fatcaStatus: 'N',
            fatcaStartDate: null,
            fatcaEndDate: null,
            landingStatus: 'N',
            landingStartDate: null,
            landingEndDate: null,
            rwsStatus: 'N',
            rwsStartDate: null,
            rwsEndDate: null,
            accountStatus: 'N',
            accountStartDate: null,
            accountEndDate: null,
            investmentStatus: 'N',
            investmentStartDate: null,
            investmentEndDate: null,
            finalStatus: 'N',
            finalStartDate: null,
            finalEndDate: null
        }
    };



    describe('valid storeLandingPageStatus actions', () => {
        it('storeLandingPageStatus should return landing page status', () => {
            const request = { customerID: 1001 };
            const action = LandingPageActions.storeLandingPageStatus(
                request);
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });

    describe('valid storeLandingPageStatusSuccess actions', () => {
        it('storeLandingPageStatusSuccess should return landing page status', () => {
            const action = LandingPageActions.storeLandingPageStatusSuccess(
                { landingPageStatus: landingPage });
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });

    describe('valid setInitialLandingPageStatus actions', () => {
        it('setInitialLandingPageStatus should return landing page status', () => {
            const userRequest = landingPage;
            const action = LandingPageActions.setInitialLandingPageStatus(
                { userRequest: landingPage.landingPageStatus });
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });



    describe('valid setInitialLandingPageStatusSuccess actions', () => {
        it('setInitialLandingPageStatusSuccess should return landing page status', () => {
            const action = LandingPageActions.setInitialLandingPageStatusSuccess(
                { landingPageStatus: landingPage.landingPageStatus });
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });

    describe('valid updateFatcaStatus actions', () => {
        it('updateFatcaStatus should return landing page status', () => {
            const userRequest = {
                fatcaStatus: {
                    fatcaStatus: 'Y',
                    fatcaStartDate: null,
                    fatcaEndDate: null,
                    onboardingId: 1
                }
            };
            const action = LandingPageActions.updateFatcaStatus(
                userRequest);
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });

    describe('valid updateLandingPageStatusSuccess actions', () => {
        it('updateLandingPageStatusSuccess should return landing page status', () => {
            const action = LandingPageActions.updateLandingPageStatusSuccess(
                { landingPageStatus: landingPage.landingPageStatus });
            const result = reducer(initialState, action);
            expect(result).toMatchObject(landingPage);
        });
    });

    describe('valid searchFundsFromLandingPage actions', () => {
        it('searchFundsFromLandingPage should return status wheather user selected select investment from landing page or not', () => {
            const action = LandingPageActions.searchFundsFromLandingPage(
                { IsSearchFundsFromLandingPage: true });
            const result = reducer(initialState, action);
            expect(result.searchFundsFromLandingPage).toBe(true);
        });
    });


});
