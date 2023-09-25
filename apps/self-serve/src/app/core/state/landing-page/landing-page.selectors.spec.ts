import * as Selectors from './landing-page.selectors';
import { selectLandingPageStatusState } from './landing-page.selectors';
import * as fromLandingPage from './landing-page.reducer';

describe('LandingPage Selectors', () => {

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
    },
    searchFundsFromLandingPage: true
  };

  it('should select the feature state', () => {
    const result = selectLandingPageStatusState({
      [fromLandingPage.landingPageFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select the selectLandingPageStatus state', () => {
    const result = Selectors.selectLandingPageStatus.projector(landingPage)
    expect(result).toEqual(landingPage.landingPageStatus);
  });

  it('should return the accountStatus from the landingPageStatus state', () => {
    // Arrange
    const expectedAccountStatus = 'N';

    // Act
    const accountStatus = Selectors.selectAccountStatus.projector(landingPage);

    // Assert
    expect(accountStatus).toBe(expectedAccountStatus);
  });
});  