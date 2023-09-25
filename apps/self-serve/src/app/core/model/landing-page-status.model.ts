export interface LandingPageStatus {
    onboardingId: number,
    clientId: string,
    clientIdType: string,
    fatcaStatus: string,
    fatcaStartDate: string,
    fatcaEndDate: string,
    landingStatus: string,
    landingStartDate: string,
    landingEndDate: string,
    rwsStatus: string,
    rwsStartDate: string,
    rwsEndDate: string,
    investmentStatus: string,
    investmentStartDate: string,
    investmentEndDate: string,
    finalStatus: string,
    finalStartDate: string,
    finalEndDate: string,
    accountStatus: string,
    accountStartDate: string,
    accountEndDate: string,
}

export interface LandingStatus {
    landingStatus: string,
    landingStartDate: string,
    landingEndDate: string,
    onboardingId: number,
}

export interface FatcaStatus {
    fatcaStatus: string,
    fatcaStartDate: string,
    fatcaEndDate: string,
    onboardingId: number,
}

export interface AccountStatus {
    onboardingId: number,
    accountStatus: string,
    accountStartDate: string,
    accountEndDate: string,
}

export interface InvestmentStatus {
    onboardingId: number ,
    investmentStatus: string,
    investmentStartDate: string,
    investmentEndDate: string
}

export interface FinalStatus {
    onboardingId: number,
    finalStatus: string,
    finalStartDate: string,
    finalEndDate: string
}


