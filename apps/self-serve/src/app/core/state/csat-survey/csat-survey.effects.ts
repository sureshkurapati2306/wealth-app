import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as CSATSurveyActions from './csat-survey.actions';
import { of } from "rxjs";
import { CsatSurveyService } from "../../services/csat-survey/csat-survey.service";

@Injectable()
export class CSATSurveyEffects {
  loadCSATSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CSATSurveyActions.loadCSATSurvey),
      switchMap(() =>
        this.csatSurveyService.getCSATSurvey().pipe(
          map((surveyCSAT) =>
            CSATSurveyActions.loadCSATSurveySuccess({ surveyCSAT })
          ),
          catchError((error) =>
            of(CSATSurveyActions.loadCSATSurveyFailure({ error }))
          )
        )
      )
    )
  );

  submitCSATSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CSATSurveyActions.submitCSATSurvey),
      switchMap((action) =>
        this.csatSurveyService.submitCSATSurvey(action.payload).pipe(
          map((submitSurveyCSAT) =>
            CSATSurveyActions.submitCSATSurveySuccess({ submitSurveyCSAT })
          ),
          catchError((error) =>
            of(CSATSurveyActions.submitCSATSurveyFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private csatSurveyService: CsatSurveyService
  ) { }
}
