export interface Questions {
    qsId: number;
    questionNo: string;
    questionaireCode: string;
    questionDesc: string;
    mandatory: string;
    multiSelect: string;
    answerOptions: AnswerOption[];
}

export interface AnswerOption {
    id: number;
    value: string;
}

export interface AnswerPayload {
    computeRiskProfile: Answers
}

export interface Answers {
    rmId: string;
    custIdIssue: string;
    cifNumber: string;
    custIdNo: string;
    custIdType: string;
    custName: string;
    onboardingId: number;
    questionAns?: QuestionAns[];
}

export interface QuestionAns {
    multiOptions: string;
    options: number[];
    questionNumber: string;
}
