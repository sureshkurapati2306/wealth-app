import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbFavouriteComponent } from './asnb-favourite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { DialogAsnbRemoveFavouriteComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-remove-favourite/dialog-asnb-remove-favourite.component';
import { asnbFavouriteDetails } from '../../mocks/data';
import { AsnbService } from '../../services/asnb.service';
import { of } from 'rxjs';

describe('AsnbFavouriteComponent', () => {
    let component: AsnbFavouriteComponent;
    let fixture: ComponentFixture<AsnbFavouriteComponent>;
    let loader: HarnessLoader;
    let matDialogMock: Partial<MatDialog>;
    let mockAsnbService: Partial<AsnbService>;

    beforeEach(async () => {
        matDialogMock = {
            open: jest.fn(),
        };

        mockAsnbService = {
            refreshFavList: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [AsnbFavouriteComponent],
            imports: [BrowserAnimationsModule, MatFormFieldModule, MatSelectModule],
            providers: [
                {
                    provide: MatDialog,
                    useValue: matDialogMock,
                },
                { provide: AsnbService, useValue: mockAsnbService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbFavouriteComponent);
        component = fixture.componentInstance;
        component.favouriteData = asnbFavouriteDetails;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit purchaseClick event with favouriteData when onPurchaseClick is called', () => {
        const emitSpy = jest.spyOn(component.purchaseClick, 'emit');

        component.onPurchaseClick();

        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith(asnbFavouriteDetails);
    });

    it('should consist of remove option for dropdown', async () => {
        const optionText = 'Remove this account';
        const selectHarness = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
        await selectHarness.open();
        const options = await selectHarness.getOptions();
        const optionByName = options.find(
            async (option) => (await option.getText()) === optionText,
        );

        expect(optionByName).toBeTruthy();
    });

    it('should open a dialog when remove option is selected and refresh favourite listing when removed successfully', async () => {
        jest.spyOn(matDialogMock, 'open').mockReturnValue({
            afterClosed: () => of(true),
        } as MatDialogRef<DialogAsnbRemoveFavouriteComponent>);

        const optionText = 'Remove this account';
        const selectHarness = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
        await selectHarness.open();
        const options = await selectHarness.getOptions();
        const optionIndex = options.findIndex(
            async (option) => (await option.getText()) === optionText,
        );
        await options[optionIndex].click();

        expect(matDialogMock.open).toHaveBeenCalled();
        expect(matDialogMock.open).toHaveBeenCalledWith(DialogAsnbRemoveFavouriteComponent, {
            data: component.favouriteData,
        });

        expect(mockAsnbService.refreshFavList).toHaveBeenCalled();
    });

    it('should open a dialog when remove option is selected and not refresh favourite listing when removed unsuccessfully', async () => {
        jest.spyOn(matDialogMock, 'open').mockReturnValue({
            afterClosed: () => of(false),
        } as MatDialogRef<DialogAsnbRemoveFavouriteComponent>);

        const optionText = 'Remove this account';
        const selectHarness = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
        await selectHarness.open();
        const options = await selectHarness.getOptions();
        const optionIndex = options.findIndex(
            async (option) => (await option.getText()) === optionText,
        );
        await options[optionIndex].click();

        expect(matDialogMock.open).toHaveBeenCalled();
        expect(matDialogMock.open).toHaveBeenCalledWith(DialogAsnbRemoveFavouriteComponent, {
            data: component.favouriteData,
        });

        expect(mockAsnbService.refreshFavList).toHaveBeenCalledTimes(0);
    });

    it('should not open remove favourite dialog if remove option is not selected', async () => {
        component.openAction('Test');

        expect(matDialogMock.open).toHaveBeenCalledTimes(0);
    });
});
