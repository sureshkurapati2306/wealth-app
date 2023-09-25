import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    ViewChild,
} from '@angular/core';
import { AsnbFavourite, FavouriteOptions } from '../../models';
import { MatSelect, MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DialogAsnbRemoveFavouriteComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-remove-favourite/dialog-asnb-remove-favourite.component';
import { AsnbService } from '../../services/asnb.service';

@Component({
    selector: 'cimb-asnb-favourite',
    templateUrl: './asnb-favourite.component.html',
    styleUrls: ['./asnb-favourite.component.scss'],
    providers: [
        {
            provide: MAT_SELECT_CONFIG,
            useValue: { overlayPanelClass: 'custom-overlay-pane' },
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class AsnbFavouriteComponent {
    @Input() favouriteData: AsnbFavourite;
    @Output() purchaseClick = new EventEmitter<AsnbFavourite>();

    @ViewChild('favSelectRef') favSelectRef: MatSelect;

    dropdownOptions: FavouriteOptions[] = [
        { action: 'Remove', description: 'Remove this account' },
    ];

    constructor(private dialog: MatDialog, private asnbService: AsnbService) {}

    openAction(selectedValue: string) {
        if (selectedValue === 'Remove') {
            this.favSelectRef.value = null;
            this.openDialog();
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogAsnbRemoveFavouriteComponent, {
            data: this.favouriteData,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.asnbService.refreshFavList();
            }
        });
    }

    onPurchaseClick() {
        this.purchaseClick.emit(this.favouriteData);
    }
}
