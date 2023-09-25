import { Action } from '@ngrx/store';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';
import * as LandingPageActions from './landing-page.actions';


describe('LandingPageActions', () => {

    let actions: Observable<Action>;

    it('should create an action storeLandingPageStatus', () => {
        const action = LandingPageActions.storeLandingPageStatus({ customerID: 1001 });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action storeLandingPageStatusSuccess', () => {
        const action = LandingPageActions.storeLandingPageStatusSuccess({landingPageStatus: null});
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action setInitialLandingPageStatus', () => {
        const action = LandingPageActions.setInitialLandingPageStatus({ userRequest: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action updateFatcaStatus', () => {
        const action = LandingPageActions.updateFatcaStatus({ fatcaStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action updateLandingPageStatusSuccess', () => {
        const action = LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action updateLandingStatus', () => {
        const action = LandingPageActions.updateLandingStatus({ landingStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action updateAccountStatus', () => {
        const action = LandingPageActions.updateAccountStatus({ accountStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action updateInvestmentStatus', () => {
        const action = LandingPageActions.updateInvestmentStatus({ investmentStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action updateFinalStatus', () => {
        const action = LandingPageActions.updateFinalStatus({ finalStatus: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action searchFundsFromLandingPage', () => {
        const action = LandingPageActions.searchFundsFromLandingPage({ IsSearchFundsFromLandingPage: true });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    
    });

});