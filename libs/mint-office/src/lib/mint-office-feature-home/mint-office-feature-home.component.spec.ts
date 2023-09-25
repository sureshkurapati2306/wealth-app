import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureHomeComponent } from './mint-office-feature-home.component';

import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

describe('MintOfficeFeatureHomeComponent', () => {
  let component: MintOfficeFeatureHomeComponent;
  let fixture: ComponentFixture<MintOfficeFeatureHomeComponent>;
  let store: MockStore<any>;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureHomeComponent ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState: {} })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MintOfficeFeatureHomeComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();

  });

  it('should goTo', () => {
    expect(component.goTo('home')).toBeUndefined();
  });
  
  it('should navigate to the correct route when valid id is provided', () => {
    
    const mockData = component.data;
    const mockId = "1";
    const navigateSpy = spyOn(router, 'navigate');

    component.goTo(mockId);

    expect(navigateSpy).toHaveBeenCalledWith([mockData[0].route]);
  });

  it('should return true if the provided id exists in the data', () => {
    const existingId = "1";
    const result = component.isExist(existingId);
    expect(result).toBeTruthy();
  });
  
  it('should return false if the provided id does not exist in the data', () => {
    const nonExistingId = "999"; 
    const result = component.isExist(nonExistingId);
    expect(result).toBeFalsy();
  });
  
  it('should return the specified value when valid id is provided', () => {
    const existingId = "1";
    const valueKey = 'description';
    const result = component.getVal(existingId, valueKey);
    expect(result).toEqual(component.data[0][valueKey]);
  });

  it('should return an empty string when valid id is provided but the specified value is missing', () => {
    const existingId = "2";
    const valueKey = 'nonExistentValueKey';
    const result = component.getVal(existingId, valueKey);
    expect(result).toEqual('');
  });
});
