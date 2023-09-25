import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundLibraryFormComponent } from '../fund-library-form/fund-library-form.component';

describe('EditFundLibraryComponent', () => {
    let component: FundLibraryFormComponent;
    let fixture: ComponentFixture<FundLibraryFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundLibraryFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundLibraryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
