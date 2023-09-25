import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { KeywordDescriptionsComponent } from './keyword-descriptions.component';

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('KeywordDescriptionsComponent', () => {
    let component: KeywordDescriptionsComponent;
    let fixture: ComponentFixture<KeywordDescriptionsComponent>;
    let dialog: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KeywordDescriptionsComponent],
            imports: [MatDialogModule],
            providers: [{ provide: MatDialog, useClass: dialogMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(KeywordDescriptionsComponent);
        dialog = TestBed.inject(MatDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openDialog', () => {
        component.openDialog();
    });
});
