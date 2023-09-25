import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};
@Component({
  selector: 'cimb-dialog-typeahead-mobile',
  templateUrl: './dialog-typeahead-mobile.component.html',
  styleUrls: ['./dialog-typeahead-mobile.component.scss']
})
export class DialogTypeaheadMobileComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  // @ViewChild('setFocus', { static: true }) setFocus: any;

  public filteredTypeaheadOptions: Observable<any[]>
  mobileTypeaheadForm: FormGroup;
  observable: Subscription;
  isinputFocus: boolean;
  constructor(
    private ngZone: NgZone,
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRefMobile: MatDialogRef<DialogTypeaheadMobileComponent>
  ) {
    dialogRefMobile.disableClose = true;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait]).subscribe((state: BreakpointState) => {
      if (!state.matches) {
        this.dialogRefMobile.close();
      }
    });
    this.mobileTypeaheadForm = this.data.mobileTypeaheadForm;
    if(this.mobileTypeaheadForm){
      this.mobileTypeaheadForm.addControl(this.data.mobileTypeaheadFormControlName, new FormControl('', []));
    }

    if (this.mobileTypeaheadForm && this.mobileTypeaheadForm.get(this.data.mobileTypeaheadFormControlName)) {
      this.filteredTypeaheadOptions = this.mobileTypeaheadForm.get(this.data.mobileTypeaheadFormControlName).valueChanges.pipe(
        startWith(''),
        map(value => this._filterLabels(value))
      )
    }
  }

  ngOnChanges() {
    if (this.data.postCodeChangeEvent) {
      if (this.mobileTypeaheadForm && this.mobileTypeaheadForm.controls && this.data.typeaheadOptions[0]) {
        this.mobileTypeaheadForm.controls[this.data.mobileTypeaheadFormControlName].patchValue(this.data.typeaheadOptions[0].stateCode);
      }

      if (this.mobileTypeaheadForm && this.mobileTypeaheadForm.get(this.data.mobileTypeaheadFormControlName)) {
        this.filteredTypeaheadOptions = this.mobileTypeaheadForm.get(this.data.mobileTypeaheadFormControlName).valueChanges.pipe(
          startWith(''),
          map(value => this._filterLabels(value))
        )
      }
    }
    if (!this.data.isDisabled && this.mobileTypeaheadForm && this.mobileTypeaheadForm.controls) {
      this.mobileTypeaheadForm.controls[this.data.mobileTypeaheadFormControlName].enable();
    }
    if (this.data.isDisabled && this.mobileTypeaheadForm && this.mobileTypeaheadForm.controls) {
      this.mobileTypeaheadForm.controls[this.data.mobileTypeaheadFormControlName].disable();
    }
  }

  displayNames(label) {
    if (!this.data.isGroupDropdown) {
      if (label != "" && label) {
        if (this.data.typeaheadOptions.find((option) => option[this.data.typeaheadId] === label)) {
          return this.data.typeaheadOptions.find((option) => option[this.data.typeaheadId] === label)[this.data.typeaheadValue];
        }
      }
    } else {
      return label;
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }


  ngAfterViewChecked(): void {
    this.trigger.openPanel();
    if (this.mobileTypeaheadForm && this.mobileTypeaheadForm.controls && this.mobileTypeaheadForm.controls[this.data.mobileTypeaheadFormControlName].value) {
      this.isinputFocus = true
    } else {
      this.isinputFocus = false
    }
    this.cdr.detectChanges();

  }

  clearInput() {
    if(this.mobileTypeaheadForm && this.mobileTypeaheadForm.controls){
      this.mobileTypeaheadForm.controls[this.data.mobileTypeaheadFormControlName].reset();
    }
  }

  getSelectedOption(event) {
    this.dialogRefMobile.close(event.option.value);
  }

  // getDialogMobileSelectedOption(event) {
  //   // this.ngZone.run((daya) => {
  //     this.dialogRefMobile.close();
  //     this.cdr.detectChanges();
  //   // });
  // }

  aftercloseMobileDialog() {
    this.dialogRefMobile.close();
  }

  closeDialog() {
    this.dialogRefMobile.close();
  }

  private _filterLabels(label: string): any[] {
    if (this.data.isGroupDropdown) {
      if (label) {
        return this.data.typeaheadOptions
          .map(group => ({ letter: group.letter, names: _filter(group.names, label) }))
          .filter(group => group.names.length > 0);
      }
      return this.data.typeaheadOptions;
    } else {
      if (label === '' || label === null) {
        return this.data.typeaheadOptions.slice()
      }
      if (label) {
        const filterValue = label.toLowerCase();
        return this.data.typeaheadOptions.filter(option => option[this.data.typeaheadValue].toLowerCase().includes(filterValue)).filter((country) => country[this.data.typeaheadValue].toLowerCase().startsWith(filterValue));
      }
    }
  }
}
