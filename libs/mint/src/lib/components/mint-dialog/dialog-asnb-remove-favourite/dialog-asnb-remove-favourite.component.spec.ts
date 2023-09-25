import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsnbRemoveFavouriteComponent } from './dialog-asnb-remove-favourite.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    AsnbFavourite,
    AsnbRemoveFavouriteResponse,
} from 'apps/self-serve/src/app/modules/asnb/models';
import { asnbFavouriteDetails } from 'apps/self-serve/src/app/modules/asnb/mocks/data';
import { Router } from '@angular/router';
import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DialogAsnbRemoveFavouriteComponent', () => {
    let component: DialogAsnbRemoveFavouriteComponent;
    let fixture: ComponentFixture<DialogAsnbRemoveFavouriteComponent>;
    let mockDialogRef: Partial<MatDialogRef<DialogAsnbRemoveFavouriteComponent>>;
    let mockData: AsnbFavourite;
    let mockRouter: Partial<Router>;
    let mockAsnbService: Partial<AsnbService>;

    beforeEach(async () => {
        mockDialogRef = {
            close: jest.fn(),
        };

        mockData = asnbFavouriteDetails;

        mockRouter = {
            navigate: jest.fn(),
        };

        mockAsnbService = {
            updateTabIndex: jest.fn(),
            sendRemoveFavouriteEvent: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [DialogAsnbRemoveFavouriteComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                { provide: Router, useValue: mockRouter },
                { provide: AsnbService, useValue: mockAsnbService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAsnbRemoveFavouriteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set favouriteData correctly on ngOnInit', () => {
        component.ngOnInit();

        expect(component.favouriteData).toEqual(mockData);
    });

    it('should close the dialog and refresh favourite tab when confirmRemoveFavourite is called successfully', async () => {
        const mockApiResponse: AsnbRemoveFavouriteResponse = {
            status: 'OK',
            code: 200,
            data: '',
            message: 'User removed as Favourite',
        };

        jest.spyOn(mockAsnbService, 'sendRemoveFavouriteEvent').mockReturnValue(
            of(mockApiResponse),
        );

        component.confirmRemoveFavourite();

        expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
        expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should close the dialog when confirmRemoveFavourite is called unsuccessfully', async () => {
        const mockApiResponse: AsnbRemoveFavouriteResponse = {
            status: 'OK',
            code: 400,
            data: '',
            message: 'User removed as Favourite',
        };

        jest.spyOn(mockAsnbService, 'sendRemoveFavouriteEvent').mockReturnValue(
            of(mockApiResponse),
        );

        component.confirmRemoveFavourite();

        expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
        expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });
});
