import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MintOfficeFeatureUserWhitelistingComponent } from './mint-office-feature-user-whitelisting.component';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

describe('MintOfficeFeatureUserWhitelistingComponent', () => {
  let component: MintOfficeFeatureUserWhitelistingComponent;
  let fixture: ComponentFixture<MintOfficeFeatureUserWhitelistingComponent>;
  let mockStore: Partial<Store>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn(() => of({})),
    };
    const dialogMock = { open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({ result: 'ok' })) }) };

    mockRouter = {
      navigate: jest.fn(),
    };

    mockActivatedRoute = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatPaginatorModule, MatTableModule, RouterTestingModule],
      declarations: [MintOfficeFeatureUserWhitelistingComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        DatePipe
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      MintOfficeFeatureUserWhitelistingComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadWhitelistingList action on initialization', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({"pageIndex": 1, "search": "", "type": "[Whitelisting User] Load List"})
    );
  });

  it('should set displayedColumns correctly', () => {
    expect(component.displayedColumns).toEqual([
      'NO.',
      'START DATE',
      'END DATE',
      'NAME',
      'ID TYPE',
      'ID NO.',
      'PRODUCT(S)',
      'PRIVILEGE',
      'LAST UPDATED',
      'ACTION'
    ]);
  });

  it('should call searchFilter when checkSearchKey is called with empty value', () => {
    const searchFilterSpy = jest.spyOn(component, 'searchFilter');

    component.checkSearchKey('');

    expect(searchFilterSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to "add-new" route on calling goToPage', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');

    component.goToPage();

    expect(navigateSpy).toHaveBeenCalledWith(['add-new'], { relativeTo: mockActivatedRoute });
  });

  it('should open dialog and dispatch actions on calling openDialog', fakeAsync(() => {
    const mockContentItem = {
      endDate: "2023-03-27T16:00:00.000+00:00",
      id: 81,
      idNo: "B567821",
      idType: "5",
      lastUpdated: null,
      name: "MMNNOO",
      privilege: "No",
      productId: "PRS",
      startDate: "2023-03-27T16:00:00.000+00:00",
    };
    const handlePageEventSpy = jest.spyOn(component, 'handlePageEvent');

    component.openDialog(mockContentItem);
    tick();

    expect(handlePageEventSpy).toHaveBeenCalledTimes(0);
  }));
  it('should call getWhiteListedUser', () => {
    const pageIndex = 1;
    expect(component.getWhiteListedUser(pageIndex)).toBeUndefined();
  });
});
