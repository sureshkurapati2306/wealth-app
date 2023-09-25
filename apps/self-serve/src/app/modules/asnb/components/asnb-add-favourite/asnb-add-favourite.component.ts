import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
    AsnbAddFavourite,
    AsnbValidateFavouriteApiErrorResponse,
    CommonDropDown,
} from '../../models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromStore from '../../../../core/state/reducers';
import {
    getAllFundsListing,
    getAddFavouriteDetails,
    getIdTypeList,
    getRelationshipList,
} from '../../+state/asnb.selectors';
import {
    clearAddFavouriteState,
    loadIdTypeList,
    loadRelationshipList,
    updateAddFavouriteState,
} from '../../+state/asnb.actions';
import { AsnbService } from '../../services/asnb.service';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@cimb/mint';

type InputRegexType = 'number' | 'alphanumeric';

@Component({
    selector: 'cimb-asnb-add-favourite',
    templateUrl: './asnb-add-favourite.component.html',
    styleUrls: ['./asnb-add-favourite.component.scss'],
})
export class AsnbAddFavouriteComponent implements OnInit {
    fundList: CommonDropDown[] = [];
    relationshipList: CommonDropDown[] = [];
    idTypeList: CommonDropDown[] = [];
    nricId = '3';
    addFavouriteForm: FormGroup;
    fieldNameMapping = {
        nickname: 'Nickname',
        beneAsnbAcctNo: 'Membership number',
        beneAsnbFundCode: 'Fund',
        beneIdType: 'ID type',
        beneIdNo: 'ID number',
        relationship: 'Relationship',
    };

    favouriteDetails: AsnbAddFavourite;

    editFormDropdownData: {
        fundTypeSelection?: CommonDropDown;
        idTypeSelection?: CommonDropDown;
        relationshipSelection?: CommonDropDown;
    } = {};

    constructor(
        private fb: FormBuilder,
        private store: Store<fromStore.AppState>,
        private asnbService: AsnbService,
        private appService: AppService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.store.select(getAllFundsListing).subscribe((data) => {
            this.fundList = data.map((item) => ({
                id: item.fundCode,
                value: item.fundLongName,
            }));
        });
        this.store.select(getIdTypeList).subscribe((data) => {
            if (data.length === 0) this.store.dispatch(loadIdTypeList());
            this.idTypeList = data;
        });
        this.store.select(getRelationshipList).subscribe((data) => {
            if (data.length === 0) this.store.dispatch(loadRelationshipList());
            this.relationshipList = data;
        });
        this.addFavouriteForm = this.fb.group({
            nickname: ['', [Validators.required, Validators.maxLength(100)]],
            beneAsnbAcctNo: ['', [Validators.required, Validators.maxLength(16)]],
            beneAsnbFundCode: ['', [Validators.required, Validators.maxLength(100)]],
            beneIdType: ['', [Validators.required, Validators.maxLength(100)]],
            beneIdNo: ['', [Validators.required, Validators.maxLength(14)]],
            relationship: ['', [Validators.required, Validators.maxLength(100)]],
        });

        this.updateForm();
    }

    updateForm() {
        this.store.select(getAddFavouriteDetails).subscribe((data) => {
            if (data.stageId !== '') {
                const frmData = {
                    nickname: data.nickname,
                    beneAsnbAcctNo: data.membershipNumber,
                    beneAsnbFundCode: data.fundCode,
                    beneIdType: data.idType,
                    beneIdNo: data.idNumber,
                    relationship: data.relationship,
                };

                this.editFormDropdownData = {
                    fundTypeSelection: {
                        id: data.fundCode,
                        value: this.fundList.find((item) => item.id === data.fundCode).value,
                    },
                    idTypeSelection: {
                        id: data.idType,
                        value: this.idTypeList.find((item) => item.id === data.idType).value,
                    },
                    relationshipSelection: {
                        id: data.relationship,
                        value: this.relationshipList.find((item) => item.id === data.relationship)
                            .value,
                    },
                };

                this.addFavouriteForm.patchValue(frmData);
                this.cd.detectChanges();
            }
        });
    }

    replaceInvalidCharacter(event: Event, fieldName: string, regexType: InputRegexType) {
        const regex = regexType === 'number' ? /[^\d]/g : /[^a-zA-Z0-9\s]/g;
        const currentValue = (event.target as HTMLInputElement).value;
        const newValue = currentValue.replace(regex, '');
        this.getFieldControl(fieldName).setValue(newValue);
    }

    formatNricField(event: Event) {
        const ic = (event.target as HTMLInputElement).value.replace(/[^\d]/g, '');
        const a = ic.slice(0, 6);
        const b = ic.slice(6, 8);
        const c = ic.slice(8, 12);
        const parts: string[] = [];
        if (a) {
            parts.push(a);
            if (b) {
                parts.push(b);
                if (c) {
                    parts.push(c);
                }
            }
        }
        this.getFieldControl('beneIdNo').setValue(parts.join('-'));
    }

    onIdTypeSelect(selectedItem: CommonDropDown) {
        const addFavouriteFormControls = this.addFavouriteForm.controls;
        const currentValue = addFavouriteFormControls.beneIdType.value;
        addFavouriteFormControls.beneIdType.setValue(selectedItem.id);
        if (
            currentValue !== selectedItem.id &&
            (selectedItem.id === this.nricId || currentValue === this.nricId)
        ) {
            addFavouriteFormControls.beneIdNo.setValue('');
            addFavouriteFormControls.beneIdNo.markAsUntouched();
        }
    }

    onDropdownClickWithoutSelection(fieldName: string) {
        this.getFieldControl(fieldName).markAsTouched();
    }

    onDropdownSelect(selectedItem: CommonDropDown, fieldName: string) {
        this.getFieldControl(fieldName).setValue(selectedItem.id);
    }

    isFieldInvalid(fieldName: string): string {
        const fieldControl = this.getFieldControl(fieldName);
        if (fieldControl.hasError('required') && fieldControl.touched) {
            return 'This field is required';
        } else if (fieldControl.hasError('maxlength')) {
            return `${this.fieldNameMapping[fieldName]} is invalid`;
        } else if (fieldControl.hasError('invalidFromApi')) {
            return fieldControl.getError('invalidFromApi');
        }
        return '';
    }

    onRedirectBack() {
        this.store.dispatch(clearAddFavouriteState());
        this.asnbService.updateTabIndex(1);
    }

    onProceed() {
        this.appService.showLoadingSpinner();
        const payload: AsnbAddFavourite = {
            nickname: this.getFieldControl('nickname').value,
            fundCode: this.getFieldControl('beneAsnbFundCode').value,
            idType: this.getFieldControl('beneIdType').value,
            relationship: this.getFieldControl('relationship').value,
            membershipNumber: this.getFieldControl('beneAsnbAcctNo').value,
            idNumber: this.getFieldControl('beneIdNo').value,
            stageId: '',
            transactionId: '',
            timestamp: '',
        };

        this.asnbService
            .validateFavourite({
                nickname: payload.nickname,
                beneAsnbFundCode: payload.fundCode,
                beneIdType: payload.idType,
                relationship: payload.relationship,
                beneAsnbAcctNo: payload.membershipNumber,
                beneIdNo:
                    payload.idType === this.nricId
                        ? payload.idNumber.replace(/-/g, '')
                        : payload.idNumber,
            })
            .subscribe({
                next: (response) => {
                    if ('stageID' in response.data[0]) {
                        this.store.dispatch(
                            updateAddFavouriteState({
                                payload: { ...payload, stageId: response.data[0].stageID },
                            }),
                        );
                        this.router.navigate(['/asnb-dashboard/review-favourite']);
                    } else {
                        const errorFields =
                            response.data as AsnbValidateFavouriteApiErrorResponse[];
                        if (errorFields[0].rejectCode === null && errorFields[0].field === null) {
                            this.displayDialog(
                                'Duplicated Fund’s Type Detected',
                                'It seems like you have chosen the same fund type for your favourite account. Please add a different fund’s type for your chosen favourite account. ',
                                'Got it',
                            );
                        } else if (errorFields[0].field === 'other') {
                            this.displayDialog(
                                'Unable to Proceed',
                                errorFields[0].rejectReason,
                                'Okay',
                            );
                        } else {
                            errorFields.forEach((item) => {
                                this.getFieldControl(item.field).setErrors({
                                    invalidFromApi: item.rejectReason,
                                });
                            });
                        }
                    }
                },
                complete: () => {
                    this.appService.hideLoadingSpinner();
                },
            });
    }

    getFieldControl(fieldName: string): AbstractControl {
        return this.addFavouriteForm.get(fieldName);
    }

    displayDialog(heading: string, description: string, buttonText: string) {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog'],
            maxWidth: '600px',
            autoFocus: false,
            disableClose: true,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger"></em>',
                dialogHeading: heading,
                dialogContent: `<p>${description}</p>`,
                dialogButtonProceed: true,
                dialogButtonProceedText: buttonText,
            },
        });
    }
}
