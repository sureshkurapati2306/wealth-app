import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { loadUrlDetails } from '../+state/asnb-settings.actions';
import { getSelectedUrl } from '../+state/asnb-settings.selectors';
import { UrlMaintenanceApiRequest } from '../../core/models/asnb.model';
import { catchError } from 'rxjs/operators';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';

@Component({
    selector: 'cimb-office-url-maintenance-form',
    templateUrl: './url-maintenance-form.component.html',
    styleUrls: ['./url-maintenance-form.component.scss'],
})
export class UrlMaintenanceFormComponent implements OnInit {
    breadcrumbsPaths: BreadcrumbsPath[];
    pageUrlCode = '';
    pageType = '';
    pageTitle = '';
    urlMaintenanceForm: FormGroup;

    getSelectedUrl$ = this.store.select(getSelectedUrl);

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
        this.store.dispatch(
            MintOfficeActions.updateCimbFooterClass({
                className: 'with-cta',
            }),
        );

        this.route.params.subscribe((data) => {
            this.pageUrlCode = data['id'];
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

        if (this.pageType === 'add') {
            this.urlMaintenanceForm = this.fb.group({
                urlShortCode: ['', [Validators.required]],
                urlLabel: ['', [Validators.required]],
                urlLink: ['', [Validators.required]],
            });
            const formData = {
                urlShortCode: '',
                urlLabel: '',
                urlLink: '',
            };
            this.urlMaintenanceForm.patchValue(formData);
        } else {
            this.urlMaintenanceForm = this.fb.group({
                urlLabel: ['', [Validators.required]],
                urlLink: ['', [Validators.required]],
            });
            this.store.dispatch(loadUrlDetails({ urlCode: this.pageUrlCode }));
            this.getSelectedUrl$.subscribe((url) => {
                if (url) {
                    const formData = {
                        urlShortCode: url.shortCode,
                        urlLabel: url.label,
                        urlLink: url.link,
                    };
                    this.urlMaintenanceForm.patchValue(formData);
                }
            });
        }
    }

    addUrl() {
        const urlShortCode = this.urlMaintenanceForm.value.urlShortCode;
        const urlLabel = this.urlMaintenanceForm.value.urlLabel;
        const urlLink = this.urlMaintenanceForm.value.urlLink;

        const payload: UrlMaintenanceApiRequest = {
            urlCode: urlShortCode,
            urlTitle: urlLabel,
            urlDesc: urlLink,
        };

        this.asnbSettingsService
            .saveUrlDetails('post', payload)
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

    editUrl() {
        const urlLabel = this.urlMaintenanceForm.value.urlLabel;
        const urlLink = this.urlMaintenanceForm.value.urlLink;

        const payload: UrlMaintenanceApiRequest = {
            urlCode: this.pageUrlCode,
            urlTitle: urlLabel,
            urlDesc: urlLink,
        };
        this.getSelectedUrl$.subscribe((url) => {
            payload.urlId = url.id;
        });

        this.asnbSettingsService
            .saveUrlDetails('put', payload)
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
            queryParams: { tab: '5' },
        });
    }
}
