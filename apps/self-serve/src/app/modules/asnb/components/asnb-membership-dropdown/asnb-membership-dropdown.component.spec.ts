import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    AsnbMembershipDropdownComponent,
    MobileDropdownComponent,
} from './asnb-membership-dropdown.component';
import { MaterialModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { from } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getSelectedMember } from '../../+state/asnb.selectors';

const listItem = [
    {
        name: 'Ahmad Aminuddin',
        membershipNumber: '4001 2665 8781',
        value: '',
    },
    {
        name: 'Two Ahmad Aminuddin Aminuddin',
        membershipNumber: '4001 2665 8782',
        value: '4001 2665 8782',
    },
];

describe('DropdownComponent', () => {
    let component: AsnbMembershipDropdownComponent;
    let fixture: ComponentFixture<AsnbMembershipDropdownComponent>;
    let dialogSpy: jest.Mocked<MatDialog>;
    let mockStore: MockStore;

    beforeEach(async () => {
        dialogSpy = {
            open: jest.fn().mockReturnValue({
                afterClosed: jest.fn().mockReturnValue(
                    from(
                        Promise.resolve({
                            name: 'John Doe',
                            membershipNumber: '1234567890',
                            value: '1234567890',
                        }),
                    ),
                ),
            }),
        } as unknown as jest.Mocked<MatDialog>;

        await TestBed.configureTestingModule({
            declarations: [AsnbMembershipDropdownComponent],
            imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule],
            providers: [{ provide: MatDialog, useValue: dialogSpy }, provideMockStore()],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
        mockStore.overrideSelector(getSelectedMember, null);

        fixture = TestBed.createComponent(AsnbMembershipDropdownComponent);
        component = fixture.componentInstance;
        component.labelText = 'Label Text';
        component.listItems = listItem;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the dialog when called', () => {
        component.openDialog();
        expect(dialogSpy.open).toHaveBeenCalled();
    });

    it('should emit the selected dropdown item', () => {
        let selectedDropdownItem: any;
        component.selectedDropdownItem.subscribe((value) => (selectedDropdownItem = value));

        component.onSelect({
            name: 'Two Ahmad Aminuddin Aminuddin',
            membershipNumber: '4001 2665 8782',
            value: '4001 2665 8782',
        });
        expect(selectedDropdownItem).toEqual({
            name: 'Two Ahmad Aminuddin Aminuddin',
            membershipNumber: '4001 2665 8782',
            value: '4001 2665 8782',
        });
    });
});

describe('MobileDropdownComponent', () => {
    let component: MobileDropdownComponent;
    let fixture: ComponentFixture<MobileDropdownComponent>;
    let dialogRef: MatDialogRef<MobileDropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, HttpClientTestingModule],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: { close: jest.fn() },
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        dialogData: listItem,
                        selectedItem: {
                            name: 'Ahmad Aminuddin',
                            membershipNumber: '4001 2665 8781',
                            value: '',
                        },
                    },
                },
            ],
            declarations: [MobileDropdownComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MobileDropdownComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call close method of dialogRef on close', () => {
        component.onClose({
            name: 'Two Ahmad Aminuddin Aminuddin',
            membershipNumber: '4001 2665 8782',
            value: '4001 2665 8782',
        });
        expect(dialogRef.close).toHaveBeenCalledWith({
            name: 'Two Ahmad Aminuddin Aminuddin',
            membershipNumber: '4001 2665 8782',
            value: '4001 2665 8782',
        });
    });

    it('should call close method of dialogRef with selected item on close', () => {
        const selectedItem = {
            name: 'Two Ahmad Aminuddin Aminuddin',
            membershipNumber: '4001 2665 8782',
            value: '4001 2665 8782',
        };
        component.onClose(selectedItem);
        expect(dialogRef.close).toHaveBeenCalledWith(selectedItem);
    });
});
