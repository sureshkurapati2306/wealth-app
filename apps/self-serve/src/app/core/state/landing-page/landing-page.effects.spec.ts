import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of } from 'rxjs';
import { LandingPageEffects } from './landing-page.effects'
import { LandingPageService } from 'apps/self-serve/src/app/core/services/landing-page/landing-page.service'
import { HttpClientModule } from '@angular/common/http';
import * as LandingPageActions from './landing-page.actions';


describe('LandingPageEffects', () => {

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


    let actions: Observable<Action>;
    let effects: LandingPageEffects;
    let service: LandingPageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), RouterTestingModule, HttpClientModule],
            providers: [
                LandingPageEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });
        service = TestBed.inject(LandingPageService);
        effects = TestBed.inject(LandingPageEffects);
    });

    describe('LandingPageEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

    describe('loadLandingPageStatus$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.storeLandingPageStatus({customerID: 1001});
            jest.spyOn(service, 'getLandingPageStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.loadLandingPageStatus$.subscribe((result) => {
                expect(true).toEqual(
                    LandingPageActions.storeLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });

    describe('setInitialUserLandingPageStatus$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.setInitialLandingPageStatus({userRequest: landingPage.landingPageStatus});
            jest.spyOn(service, 'addNewLandingPageStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.setInitialUserLandingPageStatus$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.setInitialLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });

    describe('updateFatca$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.updateFatcaStatus({fatcaStatus: landingPage.landingPageStatus});
            jest.spyOn(service, 'updateFatcaStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.updateFatca$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });

    describe('updateAccount$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.updateAccountStatus({accountStatus: landingPage.landingPageStatus});
            jest.spyOn(service, 'updateAccountStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.updateAccount$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });

    describe('updateInvestment$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.updateInvestmentStatus({investmentStatus: landingPage.landingPageStatus});
            jest.spyOn(service, 'updateInvestmentStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.updateInvestment$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });

    describe('updateFinal$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.updateFinalStatus({finalStatus: landingPage.landingPageStatus});
            jest.spyOn(service, 'updateFinalStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.updateFinal$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });
    describe('updateLanding$', () => {
        it('Should load Landing Page Status', () => {
            const action = LandingPageActions.updateLandingStatus({landingStatus: landingPage.landingPageStatus});
            jest.spyOn(service, 'updateLandingStatus').mockReturnValue(of(landingPage.landingPageStatus));
            actions = hot('a', { a: action });
            effects.updateLanding$.subscribe((result) => {
                expect(result).toEqual(
                    LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: landingPage.landingPageStatus }),
                );
            });
        });

    });
});
