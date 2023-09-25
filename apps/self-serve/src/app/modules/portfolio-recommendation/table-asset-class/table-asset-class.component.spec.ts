import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAssetClassComponent } from './table-asset-class.component';

describe('TableAssetClassComponent', () => {
  let component: TableAssetClassComponent;
  let fixture: ComponentFixture<TableAssetClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAssetClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAssetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
