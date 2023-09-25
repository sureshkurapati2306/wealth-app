export interface AccountPersonalDetails {
    title: string;
    name: string;
    id: number;
    dob: string;
    email: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    postcode: string;
    state: string;
    country: string;
    mobileNum: string;
    houseNum: string;
    officeNum: string;
    nationality: string;
    citizen: string;
    gender: string;
    race: string;
    religion: string;
    maritalStatus: string;
    industry: string;
    profession: string;
    settlementAccount?: any[];
    mykadNumber?: string;
    birthDate?: string;
    addrLine1?: string;
    addrLine2?: string;
    addrLine3?: string;
    addrLine4?: string;
    mobileNumber?: string;
    houseNumber?: string;
    officeNumber?: string;
    postCode?: string;
}
export class AccountPersonalDetailsPrototype {
    response: any;
    constructor(res: any) {
        this.response = {
            name: res.name || '',
            title: '',
            mykadNumber: res.idNo || '',
            id: res.idNo || 0,
            idType: res.idTypeCode || '',
            idNo: res.idNo || '',
            birthDate: res.birthDate || '',
            email: res.email || '',
            mobileNumber: res.homePhone || '',
            houseNumber: '',
            officeNumber: '',
            nationality: res.nationality || '',
            citizen: res.cntyCitizenship || '',
            gender: res.gender || '',
            race: res.race || '',
            religion: res.religion || '',
            maritalStatus: res.maritalStatus || '',
            industry: '',
            profession: res.profession || '',
            settlementAccount: res.bankAccounts || [],
            occupation: res.occupation || '',
            cifNo: res.cifNo || '',
            clientGroup: res.clientGroup || '',
        };
    }
}

export class AccountPersonalDetailsPostPrototype {
    postObject: any;
    constructor(res: any) {
        this.postObject = {
            clientGroup: 'SF',
            clientSegment: 'MASS',
            // openBranch: '1408',
            bankAcctNo: res.bankAcctNo || '',
            // jointAcctInd: 'S',
            // authorizedSign: 'Yes',
            name: res.name || '',
            title: res.title || '',
            mykadNumber: (res.idType || '') + ' ' + (res.idNo || ''),
            id: res.idNo || 0,
            idType1: res.idType || '',
            idNo1: res.idNo || '',
            birthDate: res.birthDate || '',
            email: res.email || '',
            addresses: [
                {
                    addressType: '2',
                    address1: res.addrLine1 || '',
                    address2: res.addrLine2 || '',
                    address3: res.addrLine3 || '',
                    address4: res.addrLine4 || '',
                    postcode: res.postcode || '',
                    state: res.state || '',
                    country: res.country || '',
                },
            ],
            mobilePhone: res.mobilePhone || '',
            homePhone: res.houseNumber || '',
            workPhone: res.officeNumber || '',
            officeNum: res.offPhone || '',
            cntyIssued1: res.nationality || '',
            nationality: res.nationality || '',
            cntyResident: res.nationality,
            citizen: res.cntyCitizenship,
            gender: res.gender || '',
            race: res.race || '',
            religion: res.religion || '',
            maritalStatus: res.maritalStatus || '',
            industry: res.industry || '',
            profession: res.profession || '',
            settlementAcctType: res.settlementAcctType || '',
            settlement: res.settlementAccount || '',
        };
    }
}

export class UTAccountOpeningAuditPrototype {
    postObject: any;
    constructor(res: any) {
        this.postObject = {
            utAccount: {
                clientGroup: res?.clientGroup || '',
                title: res?.title || '',
                name: res?.name || '',
                idNo1: res?.idNo || '',
                idType1: res?.idType || '',
                cntyIssued1: res?.nationality || '',
                birthDate: res?.birthDate || '',
                addresses: [
                    {
                        addressType: '2',
                        address1: res?.addrLine1 || '',
                        address2: res?.addrLine2 || '',
                        address3: res?.addrLine3 || '',
                        address4: res?.addrLine4 || '',
                        postcode: res?.postcode || '',
                        state: res?.state || '',
                        country: res?.country || '',
                    },
                ],
                email: res?.email || '',
                mobilePhone: res?.mobilePhone || '',
                homePhone: res?.houseNumber || '',
                workPhone: res?.officeNumber || '',
                maritalStatus: res?.maritalStatus || '',
                nationality: res?.nationality || '',
                cntyCitizenship: res?.citizen || '',
                gender: res?.gender || '',
                race: res?.race || '',
                industry: res?.industry || '',
                religion: res?.religion || '',
                cntyResident: res?.nationality,
                profession: res?.profession || '',
                // openBranch: res.openBranch || '',
                settlementAcctType: res?.settlementAcctType || '',
                bankAcctNo: res?.bankAcctNo || '',
                // jointAcctInd: res.jointAcctInd || '',
                sibsCifNo: res?.cifNo || '',
                riskprofile: res?.riskProfile || '',
                // authorizedSign: res.signingCondition || '',
            },
            audit: [],
        };
    }
}
