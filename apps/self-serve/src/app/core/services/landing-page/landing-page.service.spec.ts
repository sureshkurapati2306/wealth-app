import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env/self-serve/environment';
import { LandingPageService } from './landing-page.service';

describe('LandingPageService', () => {
  let service: LandingPageService;
  let httpMock: HttpTestingController;
  let httpRequest;
  const endpoint: string = environment.apiUrl;

  const landingPageRequest = {
    accountEndDate: null,
    accountStartDate: null,
    accountStatus: "Y",
    clientId: "C1",
    clientIdType: "CType1",
    fatcaEndDate: null,
    fatcaStartDate: null,
    fatcaStatus: "Y",
    finalEndDate: null,
    finalStartDate: null,
    finalStatus: "Y",
    investmentEndDate: null,
    investmentStartDate: null,
    investmentStatus: "Y",
    landingEndDate: null,
    landingStartDate: null,
    landingStatus: "Y",
    onboardingId: 1,
    rwsEndDate: null,
    rwsStartDate: null,
    rwsStatus: "Y",
  };

  const accountStatusResponse = {
    onboardingId: 1,
    accountStatus: "Y",
    accountStartDate: "",
    accountEndDate: ""
  }

  const fatcaStatusResponse = {
    onboardingId: 3,
    fatcaStatus: "N",
    fatcaStartDate: "",
    fatcaEndDate: ""
  }

  const rwsStatusResponse = {
    onboardingId: 1,
    rwsStatus: "N",
    rwsStartDate: "",
    rwsEndDate: ""
  }

  const finalStatus = {
    onboardingId: 1,
    finalStatus: "N",
    finalStartDate: "",
    finalEndDate: ""
  }

  const landingStatus = {
    onboardingId: 1,
    landingStatus: "Y",
    landingEndDate: "",
    landingStartDate: ""
  }

  const investmentStatus = {
    onboardingId: 1,
    investmentStatus: "N",
    investmentStartDate: "",
    investmentEndDate: ""
  }



  const blockedUserAPIRequest = {
    cif: "10280000511145"
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClient, LandingPageService],
    });
    service = TestBed.inject(LandingPageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create instance of LandingPageService', () => {
    service = TestBed.inject(LandingPageService);
    expect(service).toBeTruthy();
  });

  describe('getLandingPageStatus()', () => {
    const mockVersionResponse = null;
    it('should call getLandingPageStatus', () => {
      service.getLandingPageStatus('123').subscribe((response) => {
        expect(response).toEqual(mockVersionResponse);
      });
    });
    it('should call addNewLandingPageStatus', () => {
      service.addNewLandingPageStatus(landingPageRequest).subscribe((response) => {
        expect(response).toEqual(mockVersionResponse);
        expect(service).toBeTruthy();
      });
    });

    it('should call updateAccountStatus', () => {
      service.updateAccountStatus(landingPageRequest).subscribe((response) => {
        expect(response).toEqual(accountStatusResponse);
        expect(service).toBeTruthy();
      });
    });
    it('should call updateFatcaStatus', () => {
      service.updateFatcaStatus(fatcaStatusResponse).subscribe((response) => {
        expect(response.fatcaStatus).toEqual("N");
        expect(service).toBeTruthy();
      });
    });

    it('should call updateRwsStatus', () => {
      service.updateRwsStatus(landingPageRequest).subscribe((response) => {
        expect(response).toEqual(rwsStatusResponse);
        expect(service).toBeTruthy();
      });
    });

    it('should call updateInvestmentStatus', () => {
      service.updateInvestmentStatus(investmentStatus).subscribe((response) => {
        expect(response.investmentStatus).toEqual("N");
        expect(service).toBeTruthy();
      });
    });

    it('should call updateFinalStatus', () => {
      service.updateFinalStatus(finalStatus).subscribe((response) => {
        expect(response.finalStatus).toEqual("N");
        expect(service).toBeTruthy();
      });
    });

    it('should call updateLandingStatus', () => {
      service.updateLandingStatus(landingStatus).subscribe((response) => {
        expect(response.landingStatus).toEqual("Y");
        expect(service).toBeTruthy();
      });
    });

    it('should call getBlockedUserStatus', () => {
      service.getBlockedUserStatus(blockedUserAPIRequest).subscribe((response) => {
        expect(service).toBeTruthy();
      });
    });
  });
});
