import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAccountTableComponent } from './link-account-table.component';

describe('LinkAccountTableComponent', () => {
    let component: LinkAccountTableComponent;
    let fixture: ComponentFixture<LinkAccountTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinkAccountTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkAccountTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
