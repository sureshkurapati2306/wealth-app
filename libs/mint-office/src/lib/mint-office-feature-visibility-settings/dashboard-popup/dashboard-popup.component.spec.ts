import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardPopupComponent } from './dashboard-popup.component';
import * as DashboardPopupActions from './+state/dashboard-popup.actions';
import { DashboardPopupService } from '../../core/services/dashboard-popup.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Environment } from '../../core/models/environment.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('DashboardPopupComponent', () => {
  let component: DashboardPopupComponent;
  let fixture: ComponentFixture<DashboardPopupComponent>;
  let storeMock: any;
  let dashboardPopupServiceMock: any;

  const apiUrl = '/';

  const environment: Environment = { production: false, apiUrl: apiUrl };

  beforeEach(async () => {
    storeMock = {
      dispatch: jest.fn(),
    };
    dashboardPopupServiceMock = {
      getPopUpDetails: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, // Add this line
        HttpClientTestingModule,
        MatSlideToggleModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      declarations: [DashboardPopupComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: DashboardPopupService, useValue: dashboardPopupServiceMock },
        { provide: 'environment', useValue: environment },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPopupComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call callPopUpAPI method and set dialogPopup', () => {
    const mockResponse = {
      title: 'Mock Title',
      subtitle: 'Mock Subtitle',
      content: 'Mock Content',
      status: true,
    };
    dashboardPopupServiceMock.getPopUpDetails.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(dashboardPopupServiceMock.getPopUpDetails).toHaveBeenCalled();
    expect(component.dialogPopup).toEqual(mockResponse);
  });

  it('should update imageSrc on handleImageUpload', () => {
    const mockEvent = {
      target: {
        files: [new File(['mockContent'], 'mockImage.png', { type: 'image/png' })],
      },
    };

    component.handleImageUpload(mockEvent);

    fixture.detectChanges(); // Add this line

    expect(component.imageSrc).toBeTruthy();
    expect(component.imageUploadError).toBe(false);
    expect(component.imageUploadErrorMsg).toEqual('');
  });

  it('should call submitForm and dispatch loadDashboardPopup action', () => {
    const mockForm = {
      invalid: false,
    };
    const mockPayload = {
      title: 'Mock Title',
      subtitle: 'Mock Subtitle',
      content: 'Mock Content',
      status: true,
      imageContent: 'Mock Image Content',
    };
    component.titleComments = mockPayload.title;
    component.subtitleComments = mockPayload.subtitle;
    component.contentComments = mockPayload.content;
    component.status = mockPayload.status;
    component.imageSrcfile = mockPayload.imageContent;

    component.submitForm(mockForm as NgForm);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      DashboardPopupActions.loadDashboardPopup({ loadDashboardPopupdata: mockPayload })
    );
    expect(component.disableSave).toBe(true);
  });  

  it('should call updatePreview', () => {
    expect(component.updatePreview()).toBeUndefined();
});
});
