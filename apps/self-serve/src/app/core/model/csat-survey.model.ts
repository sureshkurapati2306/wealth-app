export interface CSATSurvey {
    title: string;
    allowSurvey: boolean;
    prompterCoolDownPeriod: number;
    lastFeedbackDate: string;
    dashboardPrompterRequired: boolean;
    logoutPrompterRequired: boolean;
    surveyRatings: Array<any>
}

export interface CSATSurveyPayload {
    surveyConfigId: number;
    platform: string;
    rating: number;
    comment: string;
}