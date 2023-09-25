import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSuspensionFormComponent } from './fund-suspension-form.component';

describe('EditFundSuspensionComponent', () => {
    let component: FundSuspensionFormComponent;
    let fixture: ComponentFixture<FundSuspensionFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundSuspensionFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundSuspensionFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
