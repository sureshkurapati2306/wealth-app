import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureVisibilitySettingsComponent } from './mint-office-feature-visibility-settings.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

describe('MintOfficeFeatureVisibilitySettingsComponent', () => {
  let component: MintOfficeFeatureVisibilitySettingsComponent;
  let fixture: ComponentFixture<MintOfficeFeatureVisibilitySettingsComponent>;
  let mockStore: jest.Mocked<Store>;

  const mockEnvironment = {
    apiUrl: 'http://example.com/api'
  };

  beforeEach(async () => {
    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn(),
    } as unknown as jest.Mocked<Store>;

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [MintOfficeFeatureVisibilitySettingsComponent],
      providers: [{ provide: 'environment', useValue: mockEnvironment }, { provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureVisibilitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } } as any;

    component.onFileSelected(mockEvent);

    expect(component.imageSrc).toBe(`http://example.com/api/gateway/wealth/image/category/1`);
  });

  it('should remove metadata from base64 string', () => {
    const base64String = 'data:image/png;base64,ABC123==';
    const expectedResult = 'ABC123==';

    const result = component.removeMetadataFromBase64(base64String);

    expect(result).toBe(expectedResult);
  });

  it('should save the image', () => {
    mockStore.select.mockReturnValue(of(true));

    component.saveImage();

    expect(component.showUploadHeaderError).toBe(true);
  });

  it('should unsubscribe from observables', () => {
    const nextSpy = jest.spyOn(component['_unsubscribeAll'], 'next');
    const completeSpy = jest.spyOn(component['_unsubscribeAll'], 'complete');
  
    component.ngOnDestroy();
  
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
