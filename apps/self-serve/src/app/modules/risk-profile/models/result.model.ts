export interface Results {
    data: Data;
    status: Status;
}

export interface Data {
    expectedReturn: number;
    expiryDate: string;
    lastUpdatedDate: string;
    recommendedProducts: any;
    riskProfile: string;
    riskProfileDescription: string;
    riskProfileStatus: string;
    rmManagerId: string;
    rmManagerName: string;
    rpResults: string;
    rpTnC: string;
    riskDescription: string;
    potentialLosses: string;
    potentialReturn: string;
    riskTolerance: string;
    riskToleranceDescription: string;
    standardDeviation: number;
}

export interface Status {
    code: string;
    dateTime: string;
    message: string;
    requestUid: string;
}
