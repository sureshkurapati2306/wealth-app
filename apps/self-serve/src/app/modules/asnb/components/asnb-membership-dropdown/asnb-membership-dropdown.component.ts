import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { AsnbMember } from '../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getSelectedMember } from '../../+state/asnb.selectors';
import { AsnbService } from '../../services/asnb.service';

@Component({
    selector: 'cimb-asnb-membership-dropdown',
    templateUrl: './asnb-membership-dropdown.component.html',
    styleUrls: ['./asnb-membership-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AsnbMembershipDropdownComponent {
    @Input() labelText!: string;
    private _listItems!: Array<AsnbMember>;

    @Output() selectedDropdownItem = new EventEmitter<AsnbMember>();

    selection: AsnbMember = {
        name: '',
        membershipNumber: '',
        value: '',
    };

    @Input()
    get listItems(): Array<AsnbMember> {
        return this._listItems;
    }

    set listItems(value: Array<AsnbMember>) {
        this._listItems = value;
        this.store.select(getSelectedMember).subscribe((member) => {
            const selection = member ?? {
                name: value[0]?.name,
                membershipNumber: value[0]?.membershipNumber,
                value: value[0]?.value,
            };
            this.selection = selection;
            this.setMemberDetail(this.selection);
        });
    }

    constructor(
        public dialog: MatDialog,
        private store: Store,
        private service: AsnbService
    ) {}

    openDialog(): void {
        if (this.listItems.length > 1) {
            const dialogRef = this.dialog.open(MobileDropdownComponent, {
                width: '100vw',
                maxWidth: '100vw',
                position: {
                    bottom: '0px',
                    left: '0px',
                },
                panelClass: 'mobile-dropdown-container',
                data: {
                    dialogData: this.listItems,
                    selectedItem: this.selection,
                },
            });

            dialogRef.afterClosed().subscribe((result: AsnbMember) => {
                const finalResult = result ?? this.selection;
                this.selection = finalResult;
                this.selectedDropdownItem.emit(finalResult);
            });
        }
    }

    onSelect(selectedItem: AsnbMember): void {
        this.selection = selectedItem;
        this.selectedDropdownItem.emit(selectedItem);

        this.setMemberDetail(this.selection);
    }

    verifySelected(optionOne: AsnbMember, optionTwo: AsnbMember): boolean {
        return optionOne.membershipNumber === optionTwo.membershipNumber;
    }

    setMemberDetail(account: AsnbMember) {
        this.service.setMemberAccount(account);
    }
}

@Component({
    selector: 'cimb-app-mobile-dropdown',
    templateUrl: './mobile-dropdown.component.html',
    styleUrls: ['./asnb-membership-dropdown.component.scss'],
})
export class MobileDropdownComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<MobileDropdownComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            dialogData: Array<AsnbMember>;
            selectedItem: AsnbMember;
        },
        private service: AsnbService
    ) {}

    dialogData!: Array<AsnbMember>;
    selectedItem!: AsnbMember;

    setMemberDetail(account: AsnbMember) {
        this.service.setMemberAccount(account);
    }

    ngOnInit() {
        this.dialogData = this.data.dialogData;
        this.selectedItem = this.data.selectedItem;

        this.setMemberDetail( this.selectedItem )
    }

    onClose(selectedItem?: AsnbMember) {
        this.dialogRef.close(selectedItem ?? this.data.selectedItem);
    }
}
