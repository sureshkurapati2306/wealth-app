import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderPanelComponent } from './table-header-panel.component';

import { downloadService } from '../../core/services/json-to-csv.service';

class mockDownloadService {
    downloadFile() {
        //mockFunction
    }
}

describe('TableHeaderPanelComponent', () => {
    let component: TableHeaderPanelComponent;
    let fixture: ComponentFixture<TableHeaderPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableHeaderPanelComponent],
            providers: [
                {
                    provide: downloadService,
                    useClass: mockDownloadService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableHeaderPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should download', () => {
        expect(component.downloadReport()).toBeUndefined();
    });
});
