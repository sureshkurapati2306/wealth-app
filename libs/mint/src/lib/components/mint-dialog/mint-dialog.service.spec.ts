import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MintDialogService } from './mint-dialog.service';

describe('MintDialogService', () => {
    let service: MintDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            MatDialogModule
          ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ],
        });
        service = TestBed.inject(MintDialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
