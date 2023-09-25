import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundLibraryTableComponent } from './fund-library-table.component';

describe('FundLibraryListComponent', () => {
    let component: FundLibraryTableComponent;
    let fixture: ComponentFixture<FundLibraryTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundLibraryTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundLibraryTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
