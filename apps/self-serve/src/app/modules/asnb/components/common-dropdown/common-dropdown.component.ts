import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { CommonDropDown } from '../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cimb-common-dropdown',
    templateUrl: './common-dropdown.component.html',
    styleUrls: ['./common-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommonDropdownComponent {
    @Input() labelText!: string;
    @Input() listItems!: Array<CommonDropDown>;
    @Input() placeholderText: string;
    @Input() selection: CommonDropDown;

    @Output() selectedDropdownItem = new EventEmitter<CommonDropDown>();
    @Output() clickWithoutSelection = new EventEmitter();

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(CommonMobileDropdownComponent, {
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

        dialogRef.afterClosed().subscribe((result: CommonDropDown) => {
            if (!result) this.clickWithoutSelection.emit();
            const finalResult = result ?? this.selection;
            this.selection = finalResult;

            const selected = this.listItems.find((item) => item.value === finalResult.value);
            this.selectedDropdownItem.emit(selected ?? ({} as CommonDropDown));
        });
    }

    onSelect(selectedItem: CommonDropDown): void {
        this.selection = selectedItem;

        const selected = this.listItems.find((item) => item.value === selectedItem.value);
        this.selectedDropdownItem.emit(selected ?? ({} as CommonDropDown));

        this.selectedDropdownItem.emit(selectedItem);
    }

    onClosed() {
        if (!this.selection) this.clickWithoutSelection.emit();
    }

    verifySelected(optionOne: CommonDropDown, optionTwo: CommonDropDown): boolean {
        return optionOne.id === optionTwo.id;
    }
}

@Component({
    selector: 'cimb-app-mobile-dropdown',
    templateUrl: './mobile-dropdown.component.html',
    styleUrls: ['./common-dropdown.component.scss'],
})
export class CommonMobileDropdownComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CommonMobileDropdownComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            dialogData: Array<CommonDropDown>;
            selectedItem: CommonDropDown;
        },
    ) {}

    dialogData!: Array<CommonDropDown>;
    selectedItem!: CommonDropDown;

    ngOnInit() {
        this.dialogData = this.data.dialogData;

        if (this.data.selectedItem) {
            this.selectedItem = this.data.selectedItem;
        }
    }

    onClose(selectedItem?: CommonDropDown) {
        if (selectedItem) {
            const selected = this.dialogData.find((item) => item.value === selectedItem.value);
            this.dialogRef.close(selected ?? ({} as CommonDropDown));
        } else {
            this.dialogRef.close();
        }
    }
}
