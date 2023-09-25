import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogAsnbRedirectionComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-redirection/dialog-asnb-redirection.component';
import { getExternalUrlList } from '../../+state/asnb.selectors';

@Component({
    selector: 'cimb-asnb-prospectus-sales-charge',
    templateUrl: './asnb-prospectus-sales-charge.component.html',
    styleUrls: ['./asnb-prospectus-sales-charge.component.scss'],
})
export class AsnbProspectusSalesChargeComponent implements OnInit {
    prospectusLink = '';
    fundPriceLink = '';

    constructor(public dialog: MatDialog, private store: Store) {}

    ngOnInit(): void {
        this.store.select(getExternalUrlList).subscribe((data) => {
            if (data.prospectus) this.prospectusLink = data.prospectus;
            if (data.fundPrice) this.fundPriceLink = data.fundPrice;
        });
    }

    redirectConfirmation(url: string): void {
        this.dialog.open(DialogAsnbRedirectionComponent, {
            backdropClass: 'asnb-redirection',
            data: {
                url: url,
            },
        });
    }
}
