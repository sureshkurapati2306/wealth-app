export interface CustomerActivityLog {
    auditId: number;
    clientId: string;
    eventId: number;
    mobileNo: string;
    auditDate: string;
    otp: string;
    referenceNo: string;
    moduleName: string;
    eventName: string;
    channelName: string;
    statusInd: string;
    browserName: string;
    osVersion: string;
    ipAddress: string;
    statusRemark?: any;
}

export interface CustomerActivityLogSearchFields {
    startDate?: Date;
    endDate?: Date;
    modules?: string[];
    channels?: string[];
}

export interface UnitTrustActivity {
    referenceNo: string;
    utAccountNo: string;
    fundName: string;
    chargesAmount: number;
    totalInvestment: number;
    toFundName: string;
    transactionUnit: number;
}

export interface SmsDeliveryLog {
    category: string; 
    clientId: string; 
    contactNumber: string; 
    deliveryDateTime: string; 
    id: number; 
    smsContent: string; 
    smsDeliveryStatus: string; 
    utAccountNo: string;
}

export interface CustomerActivityLogModules {
    moduleId: number;
    moduleName: string;
    createdBy: string;
    modifiedBy: string;
    createdDate: string;
    modifiedDate: string;
}

export interface CustomerActivityLogChannel {
    channelId: number;
    channelName: string;
    createdBy: number;
    createdDate: string;
    modifiedBy: number;
    modifiedDate: string;
}
