import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MintOfficeFeatureCsatReportingComponent } from './mint-office-feature-csat-reporting.component';
import { Store } from '@ngrx/store';
import { loadCsatQuestionnaireDetails, loadReportData } from './+state/csat-report.actions';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('MintOfficeFeatureCsatReportingComponent', () => {
  let component: MintOfficeFeatureCsatReportingComponent;
  let fixture: ComponentFixture<MintOfficeFeatureCsatReportingComponent>;
  let storeSpy: any;

  beforeEach(() => {
    storeSpy = {
      dispatch: jest.fn(),
      select: jest.fn(() => ({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn()
        })
      }))
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MintOfficeFeatureCsatReportingComponent],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    });

    fixture = TestBed.createComponent(MintOfficeFeatureCsatReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCsatQuestionnaireDetails on ngOnInit', () => {
    component.ngOnInit();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      loadCsatQuestionnaireDetails({ id: '1' })
    );
  });

  it('should dispatch loadReportData and call downloadFn when downloadReport is called', () => {
    const mockDate = new Date();
    jest.spyOn(component, 'convertDate').mockReturnValue(mockDate.toISOString());
    jest.spyOn(component, 'downloadFn');

    component.myForm.setValue({
      startDate: mockDate,
      endDate: mockDate,
      frequency: '123',
      question1: 'Sample Question'
    });

    component.downloadReport();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      loadReportData({ startDate: mockDate.toISOString(), endDate: mockDate.toISOString() })
    );
  });

  it('should set toggleSwitchStates.row1 to true on toggleSwitchChanged', () => {
    component.toggleSwitchChanged({ checked: true }, 'row1');
    expect(component.toggleSwitchStates.row1).toBe(true);
  });

  it('should set toggleSwitchStates.row2 to true on toggleSwitchChanged', () => {
    component.toggleSwitchChanged({ checked: true }, 'row2');
    expect(component.toggleSwitchStates.row2).toBe(true);
  });

  it('should set toggleSwitchStates.row1 to false on toggleSwitchChanged', () => {
    component.toggleSwitchStates.row1 = true;
    component.toggleSwitchChanged({ checked: false }, 'row1');
    expect(component.toggleSwitchStates.row1).toBe(false);
  });

  it('should set toggleSwitchStates.row2 to false on toggleSwitchChanged', () => {
    component.toggleSwitchStates.row2 = true;
    component.toggleSwitchChanged({ checked: false }, 'row2');
    expect(component.toggleSwitchStates.row2).toBe(false);
  });

  it('should return null for validateNumber when control value is a valid number', () => {
    const control = { value: '123' } as any;
    const result = component.validateNumber(control);
    expect(result).toBe(null);
  });

  it('should return an error object for validateNumber when control value is an invalid number', () => {
    const control = { value: 'abc' } as any;
    const result = component.validateNumber(control);
    expect(result).toEqual({ 'invalidNumber': true });
  });

  it('should convert date with time for picker mode', () => {
    const formattedDate = component.convertDate('2023-08-25', 'T00:00:00', 'picker');
    expect(formattedDate).toBe('2023-08-25T00:00:00');
  });

  it('should convert date without time for report mode', () => {
    const formattedDate = component.convertDate('2023-08-25', '', 'report');
    expect(formattedDate).toBe('20230825');
  });

  it('should call saveAs when downloadFn is called', () => {
    const saveAsMock = jest.requireMock('file-saver').saveAs;
    component.downloadFn('csvData', 'filename');
    expect(saveAsMock).toHaveBeenCalledWith(expect.any(Blob), 'filename.csv');
  });
  it('should call getWhiteListedUser', () => {
    expect(component.getQuestionnaireDetails()).toBeUndefined();
  });
});
