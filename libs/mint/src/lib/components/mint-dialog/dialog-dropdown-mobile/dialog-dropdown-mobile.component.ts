import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, NgZone, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(val => val.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'cimb-dialog-dropdown-mobile',
  templateUrl: './dialog-dropdown-mobile.component.html',
  styleUrls: ['./dialog-dropdown-mobile.component.scss']
})
export class DialogDropdownMobileComponent implements OnInit, OnChanges {

  public filteredDropdownOptions: Observable<any[]>
  mobileDropdownForm: FormGroup;
  observable: Subscription;
  isinputFocus: boolean;
  inputDropdown: boolean;
  constructor(
    private ngZone: NgZone,
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRefMobile: MatDialogRef<DialogDropdownMobileComponent>
  ) {
    dialogRefMobile.disableClose = true;
  }

  ngOnInit(): void {
    this.inputDropdown = this.data.inputDropdown;
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait]).subscribe((state: BreakpointState) => {
      if (!state.matches) {
        this.dialogRefMobile.close();
      }
    });
    this.mobileDropdownForm = this.data.mobileDropdownForm;
    if(this.mobileDropdownForm){
      this.mobileDropdownForm.addControl(this.data.mobiledropdownFormControlName, new FormControl('', []));
    }

    if (this.mobileDropdownForm && this.mobileDropdownForm.get(this.data.mobiledropdownFormControlName)) {
      this.filteredDropdownOptions = this.mobileDropdownForm.get(this.data.mobiledropdownFormControlName).valueChanges.pipe(
        startWith(''),
        map(value => this._filterLabels(value))
      )
    }
  }

  ngOnChanges() {
    if (this.data.postCodeChangeEvent) {
      if (this.mobileDropdownForm && this.mobileDropdownForm.controls && this.data.dropdownOptions[0]) {
        this.mobileDropdownForm.controls[this.data.mobiledropdownFormControlName].patchValue(this.data.dropdownOptions[0].stateCode);
      }

      if (this.mobileDropdownForm && this.mobileDropdownForm.get(this.data.mobiledropdownFormControlName)) {
        this.filteredDropdownOptions = this.mobileDropdownForm.get(this.data.mobiledropdownFormControlName).valueChanges.pipe(
          startWith(''),
          map(value => this._filterLabels(value))
        )
      }
    }
    if (this.mobileDropdownForm && this.mobileDropdownForm.controls) {
      this.mobileDropdownForm.controls[this.data.mobiledropdownFormControlName].enable();
    }
  }

  getSelectedOption(event) {
    this.dialogRefMobile.close(event);
  }

  closeDialog() {
    this.dialogRefMobile.close();
  }

  private _filterLabels(label: string): any[] {
    if (this.data.isGroupDropdown) {
      if (label) {
        return this.data.dropdownOptions
          .map(group => ({ letter: group.letter, names: _filter(group.names, label) }))
          .filter(group => group.names.length > 0);
      }
      return this.data.dropdownOptions;
    } else {
      if (label === '' || label === null) {
        return this.data.dropdownOptions.slice()
      }
      if (label) {
        const filterValue = label.toLowerCase();
        return this.data.dropdownOptions.filter(option => option[this.data.dropdownValue].toLowerCase().includes(filterValue)).filter((country) => country[this.data.dropdownValue].toLowerCase().startsWith(filterValue));
      }
    }
  }
}
