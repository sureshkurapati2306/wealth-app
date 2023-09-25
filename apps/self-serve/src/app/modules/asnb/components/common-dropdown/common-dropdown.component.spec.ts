import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    CommonDropdownComponent,
    CommonMobileDropdownComponent,
} from './common-dropdown.component';
import { CommonDropDown } from '../../models';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommonDropdownComponent', () => {
    let component: CommonDropdownComponent;
    let fixture: ComponentFixture<CommonDropdownComponent>;
    let mockDialog: any;

    beforeEach(async () => {
        mockDialog = {
            open: jest.fn(() => ({
                afterClosed: () => of({ id: 1, value: 'Option 1' }),
            })),
        };

        await TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatSelectModule, BrowserAnimationsModule],
            declarations: [CommonDropdownComponent, CommonMobileDropdownComponent],
            providers: [{ provide: MatDialog, useValue: mockDialog }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDropdownComponent);
        component = fixture.componentInstance;
        component.listItems = [
            { id: 'Opt1', value: 'Option 1' },
            { id: 'Opt2', value: 'Option 2' },
            { id: 'Opt3', value: 'Option 3' },
        ];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open dialog when user clicks on dropdown', () => {
        component.openDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should emit selectedDropdownItem event when user selects an item from the dropdown', () => {
        const spy = jest.spyOn(component.selectedDropdownItem, 'emit');
        component.onSelect({ id: 'Opt2', value: 'Option 2' });
        expect(spy).toHaveBeenCalledWith({ id: 'Opt2', value: 'Option 2' });
    });

    it('should emit selectedDropdownItem event with default value when user does not select an item from the dropdown', () => {
        const spy = jest.spyOn(component.selectedDropdownItem, 'emit');
        component.onSelect({} as CommonDropDown);
        expect(spy).toHaveBeenCalledWith({});
    });

    it('should emit selectedDropdownItem event with selected value when user selects an item from the mobile dropdown', () => {
        const spy = jest.spyOn(component.selectedDropdownItem, 'emit');
        component.openDialog();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const okButton = document.querySelector('.mobile-dropdown-ok-button');
            okButton?.dispatchEvent(new Event('click'));
            expect(spy).toHaveBeenCalledWith({ id: 1, value: 'Option 1' });
        });
    });
});

describe('CommonMobileDropdownComponent', () => {
    let component: CommonMobileDropdownComponent;
    let fixture: ComponentFixture<CommonMobileDropdownComponent>;
    let mockDialogRef: Partial<MatDialogRef<CommonMobileDropdownComponent>>;

    beforeEach(async () => {
        mockDialogRef = {
            close: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [CommonMobileDropdownComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        dialogData: [
                            { value: 'value1', id: 'id1' },
                            { value: 'value2', id: 'id2' },
                        ],
                        selectedItem: { value: 'value1', id: 'id1' },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonMobileDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should initialize dialogData and selectedItem in ngOnInit', () => {
        expect(component.dialogData).toEqual([
            { value: 'value1', id: 'id1' },
            { value: 'value2', id: 'id2' },
        ]);
        expect(component.selectedItem).toEqual({ value: 'value1', id: 'id1' });
    });

    it('should close the dialog with selected item when onClose is called with a selectedItem', () => {
        const selectedItem = { value: 'value2', id: 'id2' };
        component.onClose(selectedItem);

        expect(mockDialogRef.close).toHaveBeenCalledWith(expect.objectContaining(selectedItem));
    });

    it('should close the dialog without a selected item when onClose is called without a selectedItem', () => {
        component.onClose();

        expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
