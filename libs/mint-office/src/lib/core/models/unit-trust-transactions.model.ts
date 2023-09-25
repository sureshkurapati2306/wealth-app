export interface UnitTrustTransaction {
   processingStatusDate?: string | null;
   rejectedName?: string | null;
   rejectedDate?: string | null;
   rejectedRemark?:  string | null;
   cifNumber?:  string | null;
   accountStatus?:  string | null;
   jointIndicator?:  string | null;
   mobileNo?:  string | null;
   indicativeCharges?:  string | null;
   fileStatusDate?:  string | null;
   fileStatus?:  string | null;
   processingStatus?: string | null;
   transactionStatusDate: string;
   transactionStatus: string;
   transactionUnit: number;
   paymentTo: string;
   contactNo: string;
   fdAccountNo: string;
   einvestsmart: string;
   staffIndicator: string;
   staffIndicatorValue: string;
   userId: string;
   payableAmount: number;
   taxAmount: number;
   taxRate: number;
   taxCode: string;
   taxId: number;
   netInvestment: number;
   totalInvestment: number;
   chargesAmount: number;
   chargesPercentage: number;
   chargeId: number;
   utAccountNo: string;
   toFundName: string;
   toFundCode: string;
   fundName: string;
   fundCode: string;
   settlementAccount: string;
   icNumber: string;
   seqNo: number;
   clientId: string;
   clientName: string;
   transactionType: string;
   transactionDatetime: string;
   referenceNo: string;
   transId: number;
   auditId: number;
   auditDate: string;
   otp: string;
   moduleName: string;
   eventName: string;
   channelName: string;
   statusInd: string;
   browserName: string;
   osVersion: string;
   ipAddress: string;
   statusRemark?:  string | null;
   riskRatingInd: string;
   documentInd: string;
   higherFundRiskAck: string,
}

export interface UnitTrustSearchFields {
   startDate?: Date;
   endDate?: Date;
   status?: string;
   utAccNumber?:string;
   customerName?: string;
   idNumber?: string;
}

export interface RefConfigSearchFields {
   configId?: string;
   configName?: string;
   configValue?: string,
}

export interface UnitTrustRejectionFields {
   transId?: number;
   rejectedRemark?: string;
   rejectedDate?: string;
   rejectedName?: string
}