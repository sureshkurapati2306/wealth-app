import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { Customer } from '../../core/models/customer.model';
import { TablePaginatorComponent } from '../../mint-office-ui-paginator/table-paginator/table-paginator.component';

import { CsListTableComponent } from './cs-list-table.component';

const mockData: Customer[] = [
  {
    "pfId": 1,
    "utAccountNo": "A80111457",
    "accountName": "XXXXXXT MILLIO",
    "jointIndicator": "01",
    "accountStatus": "A",
    "cifNumber": "A80111457",
    "clientIdType": "NEWIC",
    "clientId": "750702105695",
    "authorisedSignatories": ""
  }
];

describe('CsListTableComponent', () => {
  let component: CsListTableComponent;
  let fixture: ComponentFixture<CsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsListTableComponent, TablePaginatorComponent ],
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsListTableComponent);
    component = fixture.componentInstance;
    component.dataSourceRows = mockData;
    component.getLoadingState = 'success';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go goToDetailPage', () => {
    expect(component.goToDetailPage(mockData[0])).toBeUndefined();
  });
});
