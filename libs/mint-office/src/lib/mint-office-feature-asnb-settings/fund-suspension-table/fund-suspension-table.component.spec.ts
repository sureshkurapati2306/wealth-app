import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSuspensionTableComponent } from './fund-suspension-table.component';

describe('FundSuspensionListComponent', () => {
    let component: FundSuspensionTableComponent;
    let fixture: ComponentFixture<FundSuspensionTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundSuspensionTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundSuspensionTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
