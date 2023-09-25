import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { InvestmentQuestionsComponent } from './investment-questions.component';

describe('InvestmentQuestionsComponent', () => {
    let component: InvestmentQuestionsComponent;
    let fixture: ComponentFixture<InvestmentQuestionsComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvestmentQuestionsComponent],
            imports: [RouterTestingModule, StoreModule.forRoot({})],
            providers: [
                provideMockStore({
                    initialState: {
                        questions: null,
                    },
                    // selectors: [{ selector: getQuestions, value: mockQuestions }],
                }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvestmentQuestionsComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to previous page', () => {
        expect(component.backButtonEvent()).toBeUndefined();
    });
});
