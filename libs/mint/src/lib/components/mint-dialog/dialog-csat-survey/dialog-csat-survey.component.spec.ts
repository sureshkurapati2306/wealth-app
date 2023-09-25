import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as CSATSurveyActions from "../../../../../../../apps/self-serve/src/app/core/state/csat-survey/csat-survey.actions";
import { DialogCsatSurveyComponent } from './dialog-csat-survey.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('DialogCsatSurveyComponent', () => {
  let component: DialogCsatSurveyComponent;
  let fixture: ComponentFixture<DialogCsatSurveyComponent>;
  let mockDialogRef: MatDialogRef<DialogCsatSurveyComponent>;
  let mockStore: Store;
  const data = {
    title: 'Sample questions',
    allowSurvey: false,
    prompterCoolDownPeriod: 30,
    lastFeedbackDate: 'date',
    dashboardPrompterRequired: false,
    logoutPrompterRequired: false,
    surveyRatings: [
      { rating: 1, description: 'Desc 1', message: 'Message 1' },
      { rating: 2, description: 'Desc 2', message: 'Message 2' },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCsatSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCsatSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cnt on form valueChanges', () => {
    const formBuilder: FormBuilder = TestBed.inject(FormBuilder);
    const form: FormGroup = formBuilder.group({
      comment: ['Initial value'],
    });
    component.commentForm = form;

    component.ngOnInit();

    form.get('comment')?.setValue('Updated value');
    expect(component.cnt).toBe('Updated value'.length);
  });

  it('should update properties on handleMouseEnter', () => {
    const index = 2;
    component.handleMouseEnter(index);
    expect(component.selectedStar).toBe(index + 1);
    expect(component.description).toEqual(data.surveyRatings[index].description);
    expect(component.placeHolderText).toEqual(data.surveyRatings[index].message);
  });

  it('should update properties on handleMouseLeave', () => {
    const previousSelection = 1;
    component.previousSelection = previousSelection;
    component.handleMouseLeave();
    expect(component.selectedStar).toBe(previousSelection);
    expect(component.description).toEqual(data.surveyRatings[previousSelection - 1].description);
    expect(component.placeHolderText).toEqual(data.surveyRatings[previousSelection - 1].message);
  });

  it('should update properties on rating', () => {
    const index = 0;
    component.rating(index);
    expect(component.selectedStar).toBe(index + 1);
    expect(component.previousSelection).toBe(index + 1);
    expect(component.description).toEqual(data.surveyRatings[index].description);
    expect(component.placeHolderText).toEqual(data.surveyRatings[index].message);
  });

  it('should return icon based on selectedStar and index', () => {
    const selectedStar = 3;
    component.selectedStar = selectedStar;
    const index = 1;

    const result = component.showIcon(index);

    expect(result).toBe('star_border');
  });

  it('should close dialog on closeDialog', () => {
    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should dispatch submitCSATSurvey action and close dialog on submitRating', () => {
    const selectedStar = 3;
    component.selectedStar = selectedStar;
    const payload = {
      surveyConfigId: 1,
      platform: 'SSP',
      rating: selectedStar,
      message: 'Mock message',
    };

    component.submitRating();

    expect(mockStore.dispatch).toHaveBeenCalledWith(CSATSurveyActions.submitCSATSurvey({ payload }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
