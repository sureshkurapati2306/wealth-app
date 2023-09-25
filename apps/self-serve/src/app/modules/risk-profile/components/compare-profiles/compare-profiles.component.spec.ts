import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getRiskProfileResults } from '../../+state/risk-profile.selectors';
import { mockSubmitAnswerResponse } from '../../mock/data';

import { CompareProfilesComponent } from './compare-profiles.component';

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('CompareProfilesComponent', () => {
    let component: CompareProfilesComponent;
    let fixture: ComponentFixture<CompareProfilesComponent>;
    let dialog: any;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompareProfilesComponent],
            imports: [MatDialogModule, StoreModule.forRoot({})],
            providers: [
                { provide: MatDialog, useClass: dialogMock },
                provideMockStore({
                    initialState: {
                        questions: null,
                    },
                    selectors: [
                        { selector: getRiskProfileResults, value: mockSubmitAnswerResponse },
                    ],
                }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompareProfilesComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openSuggestionDialog', () => {
        component.openSuggestionDialog();
    });
    it('should call riskProfileAssetAlloaction', () => {
        const allocation = ''
        expect(component.riskProfileAssetAlloaction(allocation)).toBeUndefined();
    });
});
