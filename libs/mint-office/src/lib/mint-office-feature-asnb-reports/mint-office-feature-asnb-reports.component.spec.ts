import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Environment } from '../core/models/environment.model';

import { MintOfficeFeatureAsnbReportsComponent } from './mint-office-feature-asnb-reports.component';

describe('MintOfficeFeatureIthmReportsComponent', () => {
    let component: MintOfficeFeatureAsnbReportsComponent;
    let fixture: ComponentFixture<MintOfficeFeatureAsnbReportsComponent>;
    // let downloadITHMService: IthmReportService;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MintOfficeFeatureAsnbReportsComponent],
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: 'environment',
                    useValue: environment,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // downloadITHMService = TestBed.inject(IthmReportService);
        fixture = TestBed.createComponent(MintOfficeFeatureAsnbReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
