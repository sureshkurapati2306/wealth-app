import { Questions, Results, RiskProfileDetails } from '../models';

export const mockQuestions: Questions[] = [
    {
        qsId: 10018,
        questionNo: '1',
        questionDesc: 'My invesment experience or understanding covers',
        multiSelect: 'Y',
        questionaireCode: 'Code2',
        mandatory: 'Y',
        answerOptions: [
            { id: 1, value: 'Fixed Income, Sukuk, Equities or Collective Investment Schemes' },
            { id: 2, value: 'Structured Products or Capital Protected Investment' },
            { id: 3, value: 'Futures or Options' },
            { id: 4, value: 'None of the above' },
        ],
    },
    {
        qsId: 10019,
        questionNo: '2',
        questionDesc: ' When I invest, I prefer',
        multiSelect: 'N',
        questionaireCode: 'Code2',
        mandatory: 'Y',
        answerOptions: [
            {
                id: 1,
                value: 'Portfolio A: investments with low and steady returnand little to no chance of losing my money.',
            },
            {
                id: 2,
                value: 'Portfolio B: investments with low returns as I am only comfortable with low unpredictability.',
            },
            {
                id: 3,
                value: 'Portfolio C: investments with moderate returns as I am comfortable with moderate unpredictability.',
            },
            {
                id: 4,
                value: 'Portfolio D: investments with high returns as I am comfortable with high unpredictability.',
            },
            {
                id: 5,
                value: 'Portfolio E: investments with very high returns as I am comfortable with very high unpredictability.',
            },
        ],
    },
    {
        qsId: 10020,
        questionNo: '3',
        questionDesc: 'I will be  years old on my next birthday. ',
        multiSelect: 'N',
        questionaireCode: 'Code2',
        mandatory: 'N',
        answerOptions: [
            { id: 1, value: '18 to 35' },
            { id: 2, value: '36 to 45' },
            { id: 3, value: '46 to 60' },
            { id: 4, value: '61 to 74' },
            { id: 5, value: 'above 75.' },
        ],
    },
    {
        qsId: 10021,
        questionNo: '4',
        questionDesc: 'I plan to stay invested for ____ ',
        multiSelect: 'N',
        questionaireCode: 'Code2',
        mandatory: 'Y',
        answerOptions: [
            { id: 1, value: 'less than 1 year.' },
            { id: 2, value: '1 to 3 years.' },
            { id: 3, value: '3 to 5 years.' },
            { id: 4, value: '5 to 10 years.' },
            { id: 5, value: 'more than 10 years.' },
        ],
    },
    {
        qsId: 10022,
        questionNo: '5',
        questionDesc: 'My monthly net income is ____ ',
        multiSelect: 'N',
        questionaireCode: 'Code2',
        mandatory: 'Y',
        answerOptions: [
            { id: 1, value: 'RM 4,000 and below.' },
            { id: 2, value: 'RM 4,001 to RM 7,000.' },
            { id: 3, value: 'RM 7,001 to RM 11,000.' },
            { id: 4, value: 'RM 11,001 to RM 15,000.' },
            { id: 5, value: 'RM 15,001 and above. ' },
        ],
    },
];

export const mockRiskProfileDetails: RiskProfileDetails[] = [
    {
        potentialLosses: 'High',
        potentialReturn: 'High',
        riskTolerance: 'High',
        riskToleranceDescription: 'Willing to tolerate high fluactation in investment value ',
        riskName: 'AGGRESSIVE',
        riskDescription:
            'I want to receive high capital growth and I am willing to accept the risk of losing my capital. ',
        recommendedValue: 3.0,
        classSeq: 1,
        className: 'CASH',
    },
    {
        potentialLosses: 'High',
        potentialReturn: 'High',
        riskTolerance: 'High',
        riskToleranceDescription: 'Willing to tolerate high fluactation in investment value ',
        riskName: 'AGGRESSIVE',
        riskDescription:
            'I want to receive high capital growth and I am willing to accept the risk of losing my capital. ',
        recommendedValue: 23.0,
        classSeq: 2,
        className: 'FIXED INCOME',
    },
    {
        potentialLosses: 'High',
        potentialReturn: 'High',
        riskTolerance: 'High',
        riskToleranceDescription: 'Willing to tolerate high fluactation in investment value ',
        riskName: 'AGGRESSIVE',
        riskDescription:
            'I want to receive high capital growth and I am willing to accept the risk of losing my capital. ',
        recommendedValue: 40.0,
        classSeq: 3,
        className: 'LOCAL EQUITY',
    },
];

export const mockSubmitAnswerResponse: Results = {
    status: {
        code: '0',
        message: 'Success',
        requestUid: '11baa97e-3046-4bdd-b',
        dateTime: '2022-05-27T21:23:10.000837',
    },
    data: {
        riskProfileStatus: 'VALID',
        rpResults: '-',
        riskProfile: 'Conservative',
        rpTnC: '-',
        riskProfileDescription:
            'CONSERVATIVE - Whilst you prefer your investments to be in low risk products, you are comfortable with a small portion of your investment in volatile assets. You will invest in a portfolio that will meet income needs and show a fair real return (capital growth) over a medium to long term.',
        expectedReturn: 4.9613,
        standardDeviation: 6.680130065236006,
        lastUpdatedDate: '09-Oct-2021',
        expiryDate: '09-Oct-2022',
        rmManagerName: 'ADMIN',
        riskDescription: 'High',
        potentialLosses: 'High',
        potentialReturn: 'High',
        riskTolerance: 'High',
        riskToleranceDescription: 'High',
        rmManagerId: 'ADMIN1',
        recommendedProducts: [
            {
                fundName: 'RHB Asian Income Fund - SGD',
                fundCode: 'RHB16A',
                currency: 'SGD',
                fundRiskProfile: 'Growth',
                fundCategory: 'Takaful',
                recommendedAsset: 'Y',
                riskRating: 2,
                riskProfile: '4',
            },
            {
                fundName: 'CIMB-Principal PRS Plus Equity',
                fundCode: '120',
                currency: 'MYR',
                fundRiskProfile: 'Aggressive',
                fundCategory: 'Takaful',
                recommendedAsset: 'Y',
                riskRating: 0,
                riskProfile: '5',
            },
            {
                fundName: 'CIMB-Principal PRS Plus Asia Pacific Ex Japan Equity',
                fundCode: '121',
                currency: 'MYR',
                fundRiskProfile: 'Growth',
                fundCategory: 'Takaful',
                recommendedAsset: 'Y',
                riskRating: 0,
                riskProfile: '4',
            },
        ],
    },
};
