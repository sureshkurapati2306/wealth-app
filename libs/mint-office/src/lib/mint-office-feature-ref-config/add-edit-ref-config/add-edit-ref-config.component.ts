import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../+state/ref-config.reducer';
import * as RefConfigSelector from 'libs/mint-office/src/lib/mint-office-feature-ref-config/+state/ref-config.selectors';
import { Job } from '../../core/models/job.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { Actions, ofType } from '@ngrx/effects';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';
import { tap } from 'rxjs/operators';
import * as UnitTrustTransactionsActions from '../+state/ref-config.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-office-add-edit-ref-config',
  templateUrl: './add-edit-ref-config.component.html',
  styleUrls: ['./add-edit-ref-config.component.scss']
})


export class AddEditRefConfigComponent implements OnInit {
  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Batch File Scheduler',
      url: '/batch-file-scheduler',
    },
    {
      label: 'Add Batch File Scheduler',
      url: null,
    },
  ];

  jobs: Job;

  ishidden = false;

  schedulerForm: FormGroup;

  message = '';

  enabled = false;



  notice: string;

  editData: any;

  editScreen = false;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private router: Router,
    private actions$: Actions,
  ) { }

  ngOnInit() {

    this.schedulerForm = this.fb.group({
      refId: ['', ],
      refName: [''],
      refValue: [''],
    });

    const url = this.router.url;
    if (url.indexOf('/edit-ref-config') > 0) {
      this.store
        .select(RefConfigSelector.selectedItem)
        .pipe(
          tap((data: any) => {
            if (data) {
              this.editData= data;
              console.log(this.editData)
            }

          }))
        .subscribe();
        this.schedulerForm.controls['refId'].setValue(this.editData.configId);
        this.schedulerForm.controls['refName'].setValue(this.editData.configName);
        this.schedulerForm.controls['refValue'].setValue(this.editData.configValue);
      this.editScreen = true;
    }
    else {
      this.editScreen = false;
    }



    //add class to cimb-footer to increase footer margin
    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: 'with-cta'
    }));
  }

  createRefConfig() {
    const refConfig: any = {
      configName: this.schedulerForm.value.refName,
      configId: this.schedulerForm.value.refId,
      configValue: this.schedulerForm.value.refValue
    };
    if(this.editScreen) {
      this.store.dispatch(UnitTrustTransactionsActions.editRefConfig({editItem : refConfig }))
    } else {
      this.store.dispatch(UnitTrustTransactionsActions.addRefConfig({addItem : refConfig }))
    }

    this.actions$
    .pipe(ofType(UnitTrustTransactionsActions.loadRefConfigSuccess))
    .subscribe(() => {
      this.router.navigate(['ref-config']);
    })    
  }

  back() {

    this.router.navigate(['ref-config']);
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {

    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: ''
    }));
  }
}

