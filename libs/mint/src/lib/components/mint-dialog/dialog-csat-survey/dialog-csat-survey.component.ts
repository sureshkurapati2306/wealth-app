import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import { Observable, Subject } from 'rxjs';
import * as CSATSurveyActions from '../../../../../../../apps/self-serve/src/app/core/state/csat-survey/csat-survey.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as CSATSuveySelector from '../../../../../../../apps/self-serve/src/app/core/state/csat-survey/csat-survey.selectors';
import { skip, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'cimb-dialog-csat-survey',
  templateUrl: './dialog-csat-survey.component.html',
  styleUrls: ['./dialog-csat-survey.component.scss']
})
export class DialogCsatSurveyComponent implements OnInit, OnDestroy {
  cnt = 0;
  starCount = 5;
  maxRatingArr = [];
  maxRating = 5;
  selectedStar = 5;
  myStar = [];
  previousSelection = 5;
  description: string;
  placeHolderText: string;
  getData$: Observable<any>;
  textControl = new FormControl();
  commentForm: FormGroup;
  csatSurveyObservable$: Observable<any[]>;
  title = '';
  thankyouFlag = false;
  _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DialogCsatSurveyComponent>,
    private store: Store<fromStore.AppState>, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.maxRatingArr = Array(this.maxRating).fill('./assets/images/star_solid.svg');
    this.description = this.data?.surveyRatings.filter(x => x.rating === 5)[0].description;
    this.placeHolderText = this.data?.surveyRatings.filter(x => x.rating === 5)[0].message;

    this.commentForm.controls['comment'].valueChanges.subscribe((changeValue) => {
      this.cnt = changeValue.length;
    });
  }

  handleMouseEnter(index) {
    this.selectedStar = index + 1
    this.description = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].description;
    this.placeHolderText = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].message;
  }

  handleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
    this.description = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].description;
    this.placeHolderText = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].message;
  }

  rating(index) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.description = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].description;
    this.placeHolderText = this.data.surveyRatings.filter(x => x.rating === this.selectedStar)[0].message;
  }

  showIcon(index: number) {
    if (this.selectedStar > index) {
      return './assets/images/star_solid.svg';
    } else {
      return './assets/images/star_border.svg';
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

  submitRating() {
    const param = {
      surveyConfigId: 1,
      platform: "SSP",
      rating: this.selectedStar,
      comment: this.commentForm.controls['comment'].value
    }
    this.store.dispatch(CSATSurveyActions.submitCSATSurvey({ payload: param }));
    this.csatSurveyObservable$ = this.store.select(CSATSuveySelector.selectCSATSurveySubmit);
    this.csatSurveyObservable$.pipe(skip(1),
      takeUntil(this._unsubscribeAll)).subscribe(() => {
        this.thankyouFlag = true;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}