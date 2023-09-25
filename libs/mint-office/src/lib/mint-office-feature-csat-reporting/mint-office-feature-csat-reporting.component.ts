import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { CsatQuestionnaire } from '../core/models/csat-report.model';
import { Store } from '@ngrx/store';
import { loadCsatReport, loadCsatQuestionnaireDetails, loadReportData } from './+state/csat-report.actions';
import { selectCsatQuestionnaire, selectReportData } from './+state/csat-report.selectors'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { EventService } from '@cimb/core';

@Component({
  selector: 'cimb-office-mint-office-feature-csat-reporting',
  templateUrl: './mint-office-feature-csat-reporting.component.html',
  styleUrls: ['./mint-office-feature-csat-reporting.component.scss']
})
export class MintOfficeFeatureCsatReportingComponent implements OnDestroy, OnInit {

  disableDownload = true;
  onPageLoadQues: string;
  onPageLoadFreq: number;

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'CUSTOMER SATISFACTION MODULE',
      url: null
    }
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.compose([Validators.required,])],
    endDate: ['', Validators.compose([Validators.required,])],
    frequency: ['', [Validators.required, Validators.maxLength(3), this.validateNumber]],
    question1: ['', [Validators.required, Validators.maxLength(100)]]
  });

  maxCharacterLengthQuestion = 100;
  question1 = [];

  toggleSwitchStates = {
    row1: false,
    row2: false
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
    private store: Store,
    private _eventService: EventService) { }

  ngOnInit(): void {
    this.getQuestionnaireDetails();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getQuestionnaireDetails() {
    this.store.dispatch(loadCsatQuestionnaireDetails({ id: '1' }));
    this.store.select(selectCsatQuestionnaire).pipe(takeUntil(this._unsubscribeAll)).subscribe((results) => {
      if (results) {
        this.toggleSwitchStates.row1 = results?.dashboardPrompterRequired;
        this.toggleSwitchStates.row2 = results?.logoutPrompterRequired;
        this.onPageLoadQues = results?.title;
        this.myForm.get('question1')?.setValue(results?.title);
        this.onPageLoadFreq = results?.prompterCoolDownPeriod;
        this.myForm.get('frequency')?.setValue(results?.prompterCoolDownPeriod);
      }
    });
  }

  downloadReport() {
    if (this.myForm?.get('startDate').value !== '' && this.myForm?.get('endDate').value !== '') {
      const startDateValue = this.convertDate(this.myForm?.get('startDate').value, 'T00:00:00', 'picker');
      const endDateValue = this.convertDate(this.myForm?.get('endDate').value, 'T23:59:59', 'picker');
      this.store.dispatch(loadReportData({ startDate: startDateValue, endDate: endDateValue }));
      this.store.select(selectReportData)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((results) => {
          if (results && results.length > 0) {
            this.downloadFn(results, 'csat-report' + '-' +
              this.convertDate(this.myForm?.get('endDate').value, '', 'report'));
            this._unsubscribeAll.next();
          }
        });
    }
  }

  saveQuestionnaire(mode: string) {
    if (this.myForm?.get('question1').value !== '' && this.myForm?.get('frequency').value !== '') {
      if (mode === 'submit') {
        this._eventService.onSendQuestionnaireToogle({ toogleSelected: true });
        const payload: CsatQuestionnaire = {
          title: this.myForm?.get('question1').value,
          prompterCoolDownPeriod: this.myForm?.get('frequency').value,
          dashboardPrompterRequired: this.toggleSwitchStates?.row1,
          logoutPrompterRequired: this.toggleSwitchStates?.row2
        }
        this.store.dispatch(loadCsatReport({ payload }));
      } else if (mode === 'toggle') {
        this._eventService.onSendQuestionnaireToogle({ toogleSelected: false });
        const payload: CsatQuestionnaire = {
          title: this.onPageLoadQues,
          prompterCoolDownPeriod: this.onPageLoadFreq,
          dashboardPrompterRequired: this.toggleSwitchStates?.row1,
          logoutPrompterRequired: this.toggleSwitchStates?.row2
        }
        this.store.dispatch(loadCsatReport({ payload }));
      }
    }
  }

  validateNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== '' && !/^\d+$/.test(control.value)) {
      return { 'invalidNumber': true };
    }
    return null;
  }

  toggleSwitchChanged(event: any, row: string) {
    this.toggleSwitchStates[row] = event.checked;
    this.saveQuestionnaire('toggle');
  }

  convertDate(dateString: string, attachTime: string, mode: string) {
    const date = new Date(dateString);
    if (mode === 'picker') {
      const offsetMinutes = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - offsetMinutes);
      const isoDate = date.toISOString().substring(0, 10);
      return isoDate + attachTime.toString();
    } else if (mode === 'report') {
      const day = date?.getDate().toString().padStart(2, '0');
      const month = (date?.getMonth() + 1).toString().padStart(2, '0');
      const year = date?.getFullYear();
      return `${year}${month}${day}`;
    }
  }

  downloadFn(csvData: any, title: string) {
    if (csvData) {
      const data: Blob = new Blob([csvData], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(data, title + `.csv`)}

  }
}
