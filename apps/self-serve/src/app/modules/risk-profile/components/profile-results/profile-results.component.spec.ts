import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProfileResultsComponent } from './profile-results.component';

describe('ProfileResultsComponent', () => {
    let component: ProfileResultsComponent;
    let fixture: ComponentFixture<ProfileResultsComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileResultsComponent],
            imports: [StoreModule.forRoot({})],
            providers: [
                provideMockStore({
                    initialState: {
                        questions: null,
                    },
                }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileResultsComponent);
        store = TestBed.inject(MockStore);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should called checkUserType if NTP', () => {
        const customerType = 'NTP';

        expect(component.checkUserType(customerType)).toBeFalsy();
    });

    it('should called checkUserType non-NTP', () => {
        const customerType = 'ETP';

        expect(component.checkUserType(customerType)).toBeFalsy();
    });
});
