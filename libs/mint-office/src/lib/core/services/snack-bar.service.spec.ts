import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openSnackbar:::success type', () => {
    expect(service.openSnackbar('The snackbar message', 1000)).toBeUndefined();
  });

  it('openSnackbar:::warning type', () => {
    expect(service.openSnackbar('The snackbar message', 1000, 'warning')).toBeUndefined();
  });
});
