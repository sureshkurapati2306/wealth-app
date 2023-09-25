import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Environment } from '../core/models/environment.model';
import { IthmReportService } from '../core/services/ithm-report.service';

import { MintOfficeFeatureIthmReportsComponent } from './mint-office-feature-ithm-reports.component';


class mockDownloadReportService {
  getReport() {
    return of("01_USER NAME","02_DATE TIME","03_ERROR MESSAGE",
    "test1","2022-04-13T16:21:15.000","Correct username, No retail access",
    "test1","2022-04-13T16:26:49.000","Correct username, No retail access",
    "test1","2022-04-13T16:28:20.000","Correct username, No retail access",
    "test1","2022-04-13T16:28:26.000","Correct username, No retail access",
    "test1","2022-04-13T16:31:18.000","Correct username, No retail access",
    "test1","2022-04-18T10:08:50.000","Correct username, wrong password")
  }
 
}

const mockUserListingReportData:any = [
  "01_USER ID","02_FULL NAME","03_EMPLOYEE ID","04_EMAIL ADDRESS","05_DEPARTMENT","06_USER GROUP","07_USER STATUS","08_LAST LOGIN DATE AND TIME","09_CREATED DATE AND TIME",
  "kavin","kavinprakash partkunan","","kavinprakash.partkunan@cimb.com","","customer_support","Active","","2022-02-17T16:39:39.000",
  "mycp2lle","pannirselvam minniappan","","pannirselvam.minniappan@cimb.com","","customer_support","Active","","2022-02-16T16:11:56.000",
  "test1"," ","","","","customer_support, ithm_ops","Active","","2022-03-01T14:58:53.000",
  "test5"," ","","","","customer_support, prod_ops, wm_ops","Active","","2022-04-11T12:19:09.000",
  "yiiyin.chan","yiiyin chan","","yiiyin.chan@cimb.com","","customer_support","Active","","2022-02-10T17:07:25.000"
]


describe('MintOfficeFeatureIthmReportsComponent', () => {
  let component: MintOfficeFeatureIthmReportsComponent;
  let fixture: ComponentFixture<MintOfficeFeatureIthmReportsComponent>;
  let downloadITHMService: IthmReportService;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureIthmReportsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'environment', useValue: environment
        },
        { 
          provide: IthmReportService, useClass: mockDownloadReportService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    downloadITHMService = TestBed.inject(IthmReportService);
    fixture = TestBed.createComponent(MintOfficeFeatureIthmReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download a report', () => {
    const spy = jest.spyOn(downloadITHMService, 'getReport');
   
    expect(component.downloadReport('authenticate/admin/report/violations', 'test')).toBeUndefined();
  })

  it('should access download fn', () => {

    const data: Blob = new Blob([mockUserListingReportData], {
      type: "text/csv;charset=utf-8"
    });
    global.URL.createObjectURL = jest.fn();

    expect(component.downloadFn(mockUserListingReportData, 'test')).toBeUndefined();
  })
});
