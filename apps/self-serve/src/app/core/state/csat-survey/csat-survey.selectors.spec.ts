import { createFeatureSelector } from "@ngrx/store";
import { CSATSurveyFeatureKey, CSATSurveyState } from "./csat-survey.reducer";
import { selectCSATSurveyPopup, selectCSATSurveySubmit } from "./csat-survey.selectors";

describe('CSATSurveyPopupSelectors', () => {
  const mockState: CSATSurveyState = {
    surveyCSAT: 'Sample Dialog',
    submitSurveyCSAT: 'Sample Dialog',
    loading: false,
    error: null,
  };

  const mockRootState = {
    [CSATSurveyFeatureKey]: mockState,
  };

  const selectMockDialogPopupState = createFeatureSelector<CSATSurveyState>(
    CSATSurveyFeatureKey
  );

  it('should select the CSATSurveyPopup from the state', () => {
    const selectedCSATSurveyPopup = selectCSATSurveyPopup.projector(
      selectMockDialogPopupState(mockRootState)
    );

    expect(selectedCSATSurveyPopup).toEqual('Sample Dialog');
  });

  it('should select the CSATSurveySubmit from the state', () => {
    const selectCSATSurveySubmitPopup = selectCSATSurveySubmit.projector(
      selectMockDialogPopupState(mockRootState)
    );

    expect(selectCSATSurveySubmitPopup).toEqual('Sample Dialog');
  });
});
