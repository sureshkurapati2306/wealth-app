import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDropDown } from '../../models';
import { getSofSowList } from '../../+state/asnb.selectors';
import { Store } from '@ngrx/store';

@Component({
    selector: 'cimb-asnb-source-of-fund-wealth',
    templateUrl: './asnb-source-of-fund-wealth.component.html',
    styleUrls: ['./asnb-source-of-fund-wealth.component.scss'],
})
export class AsnbSourceOfFundWealthComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AsnbSourceOfFundWealthComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            showSow: boolean;
        },
        private store: Store,
    ) {}

    sourceofWealthAndFundsData: FormGroup;
    sourceOfWealthAndFund$ = this.store.select(getSofSowList);

    showSofOthers = false;
    showSowOthers = false;
    isButtonEnabled = false;
    maxLength = 255;

    sourceOfWealthAndFunds: CommonDropDown[] = [];

    ngOnInit(): void {
        this.sourceOfWealthAndFund$.subscribe((data) => {
            this.sourceOfWealthAndFunds = data;
        });

        this.sourceofWealthAndFundsData = new FormGroup({
            sof: new FormControl(''),
            sofOthers: new FormControl(''),
            sow: new FormControl(''),
            sowOthers: new FormControl(''),
        });

        this.sourceofWealthAndFundsData.valueChanges.subscribe((data) => {
            this.showSofOthers = data.sof === 'OTH';
            this.showSowOthers = data.sow === 'OTH';

            if (this.data.showSow) {
                const isSofValid =
                    (this.showSofOthers &&
                        data.sofOthers &&
                        data.sofOthers.length <= this.maxLength) ||
                    (data.sof && !this.showSofOthers);

                const isSowValid =
                    (this.showSowOthers &&
                        data.sowOthers &&
                        data.sowOthers.length <= this.maxLength) ||
                    (data.sow && !this.showSowOthers);

                this.isButtonEnabled = isSofValid && isSowValid;
            } else {
                const isSofValid =
                    (this.showSofOthers &&
                        data.sofOthers &&
                        data.sofOthers.length <= this.maxLength) ||
                    (data.sof && !this.showSofOthers);

                this.isButtonEnabled = isSofValid;
            }
        });
    }

    onSofSelect(selectedItem: CommonDropDown): void {
        this.sourceofWealthAndFundsData.patchValue({
            sof: selectedItem.id,
        });
    }

    onSowSelect(selectedItem: CommonDropDown): void {
        this.sourceofWealthAndFundsData.patchValue({
            sow: selectedItem.id,
        });
    }

    onSubmit() {
        if (this.isButtonEnabled) {
            this.dialogRef.close(this.sourceofWealthAndFundsData.value);
        }
    }

    onClose() {
        this.dialogRef.close();
    }
}
