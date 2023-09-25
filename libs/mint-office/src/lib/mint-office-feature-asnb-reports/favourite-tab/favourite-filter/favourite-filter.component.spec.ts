import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouriteFilterComponent } from './favourite-filter.component';

describe('FavouriteFilterComponent', () => {
  let component: FavouriteFilterComponent;
  let fixture: ComponentFixture<FavouriteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
