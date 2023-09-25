import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AddNewComponent } from './add-new.component';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { WhitelistingUserService } from '../../core/services/whitelisting-user.service';

describe('AddNewComponent', () => {
  let component: AddNewComponent;
  let fixture: ComponentFixture<AddNewComponent>;
  let whitelistingUserServiceMock: Partial<WhitelistingUserService>;
  let snackBarServiceMock: Partial<SnackBarService>;

  beforeEach(() => {
    whitelistingUserServiceMock = {
      uploadWhiteListingCsvFile: () => of({}),
    };

    snackBarServiceMock = {
      openSnackbar: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [AddNewComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: WhitelistingUserService, useValue: whitelistingUserServiceMock },
        { provide: SnackBarService, useValue: snackBarServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate file name to be a CSV', () => {
    const validFileName = 'file.csv';
    const invalidFileName = 'file.txt';

    const validResult = component.isValidCsv(validFileName);
    const invalidResult = component.isValidCsv(invalidFileName);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false);
  });

  it('should patch value and update validity on file selection', () => {
    const file = new File([''], 'file.csv', { type: 'text/csv' });
    const inputElement = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;

    component.onFileSelected({ target: inputElement } as any);

    expect(component.addNewFb.get('uploadfile').valid).toBe(false);
  });

  it('should display error when selecting non-CSV file', () => {
    const inputElement = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    const file = new File([''], 'file.txt', { type: 'text/plain' });

    component.onFileSelected({ target: inputElement } as any);

    expect(component.addNewFb.get('uploadfile').value).toBe('');
    expect(component.addNewFb.get('uploadfile').hasError('invalidCsv')).toBe(false);
  });

  it('should not submit when form is invalid', () => {
    const uploadCsvSpy = jest.spyOn(component, 'uploadCsv');
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    component.addNewFb.get('uploadfile').setValue('');
    fixture.detectChanges();

    submitButton.click();

    expect(uploadCsvSpy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
