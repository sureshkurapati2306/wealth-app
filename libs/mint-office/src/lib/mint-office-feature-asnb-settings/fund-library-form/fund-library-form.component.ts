import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFundLibrary } from '../+state/asnb-settings.actions';
import { getFundLibrary } from '../+state/asnb-settings.selectors';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Subscription } from 'rxjs';
import { FundLibraryTable } from '../../core/models/asnb.model';

@Component({
    selector: 'cimb-office-fund-library-form',
    templateUrl: './fund-library-form.component.html',
    styleUrls: ['./fund-library-form.component.scss'],
})
export class FundLibraryFormComponent implements OnInit, OnDestroy {
    fundLibraryForm: FormGroup;
    breadcrumbsPaths: BreadcrumbsPath[];
    fundId = 0;
    fundBankChargeAmount = '';
    pageType = '';
    pageTitle = '';
    pageFundCode = '';
    pageFundType = 'variable';
    getFundLibrary: Subscription;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
        private asnbSettingsService: AsnbSettingsService,
        private snackBarService: SnackBarService,
    ) {
        this.breadcrumbsPaths = [];
    }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            this.fundId = data['id'];
        });

        this.route.data.subscribe((data) => {
            this.pageType = data.type;
            this.pageTitle = data.title;
            this.breadcrumbsPaths = [
                {
                    label: 'ASNB Settings',
                    url: '/asnb-settings',
                },
                {
                    label: data.title,
                    url: null,
                },
            ];
        });

        if (this.pageType === 'edit') {
            this.fundLibraryForm = this.fb.group({
                fundName: ['', [Validators.required]],
                fundType: [0],
                fundBankChargeAmount: '',
            });

            this.store.dispatch(loadFundLibrary({ fundId: this.fundId }));
            this.getFundLibrary = this.store.select(getFundLibrary).subscribe((fund) => {
                if (fund) {
                    const fundData = fund;
                    this.pageFundCode = fundData.fundCode;
                    this.pageFundType = fundData.fundType;

                    const formData = {
                        fundName: fundData.paramText,
                        fundType: getFundTypeAndAmount(fundData).fundType,
                        fundBankChargeAmount: getFundTypeAndAmount(fundData).amount,
                    };

                    this.fundLibraryForm.patchValue(formData);
                }
            });
        } else {
            this.fundLibraryForm = this.fb.group({
                fundCode: ['', [Validators.required]],
                fundName: ['', [Validators.required]],
                fundType: [0],
                fundBankChargeAmount: 0.0,
            });

            const formData = {
                fundCode: '',
                fundName: '',
                fundType: 0,
                fundBankChargeAmount: '',
            };

            this.fundLibraryForm.patchValue(formData);
        }
    }

    addFund() {
        const fundCode = this.fundLibraryForm.value.fundCode;
        const fundName = this.fundLibraryForm.value.fundName;
        const fundType = this.fundLibraryForm.value.fundType;
        const fundBankChargeAmount = this.fundLibraryForm.value.fundBankChargeAmount;

        const payload = {
            fundCode: fundCode,
            fundDesc: fundName,
            isFixedFundType: fundType ? true : false,
            amount: fundBankChargeAmount ? fundBankChargeAmount : 0.0,
        };

        this.asnbSettingsService
            .saveFundLibrary('post', payload)
            .pipe(
                catchError((error) => {
                    this.snackBarService.openSnackbar(error.error.message, 5000, 'danger');
                    throw error;
                }),
            )
            .subscribe(() => {
                this.displaySuccessSnackbar();
                this.backHandler();
            });
    }

    editFund(fundId: number) {
        const fundName = this.fundLibraryForm.value.fundName;
        const fundType = this.fundLibraryForm.value.fundType;
        const fundBankChargeAmount = this.fundLibraryForm.value.fundBankChargeAmount;

        const payload = {
            fundDesc: fundName,
            isFixedFundType: fundType ? true : false,
            amount: fundBankChargeAmount ? fundBankChargeAmount : 0,
        };

        this.asnbSettingsService
            .saveFundLibrary('put', payload, fundId)
            .pipe(
                catchError((error) => {
                    this.snackBarService.openSnackbar(error.error.message, 5000, 'danger');
                    throw error;
                }),
            )
            .subscribe(() => {
                this.displaySuccessSnackbar();
                this.backHandler();
            });
    }

    onFundTypeChange() {
        const { fundBankChargeAmount, fundCode, fundName, fundType } = this.fundLibraryForm.value;
        this.fundLibraryForm = this.fb.group({
            fundCode: this.pageType === 'add' ? [fundCode, [Validators.required]] : undefined,
            fundName: [fundName, [Validators.required]],
            fundType: [fundType],
            fundBankChargeAmount:
                fundType === 1
                    ? [fundBankChargeAmount, [Validators.required]]
                    : fundBankChargeAmount,
        });
    }

    displaySuccessSnackbar() {
        this.snackBarService.openSnackbar(
            'You have saved the changes successfully!',
            5000,
            'success',
        );
    }

    backHandler() {
        this.router.navigate(['/asnb-settings'], {
            replaceUrl: true,
            queryParams: { tab: '3' },
        });
    }

    ngOnDestroy() {
        if (this.getFundLibrary) {
            this.getFundLibrary.unsubscribe();
        }
    }
}

function getFundTypeAndAmount(fundData: FundLibraryTable): { fundType: number; amount: string } {
    if (fundData.fundType === 'fixed') {
        return { fundType: 1, amount: fundData.amount.toFixed(2) };
    }
    return { fundType: 0, amount: '' };
}
