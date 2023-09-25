import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { FundDetailComponentLoaderSectionContentComponent } from './fund-detail-component-loader-section-content.component';

describe('FundDetailComponentLoaderSectionContentComponent', () => {
  let component: FundDetailComponentLoaderSectionContentComponent;
  let fixture: ComponentFixture<FundDetailComponentLoaderSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundDetailComponentLoaderSectionContentComponent ],
      imports: [
        StoreModule.forRoot({})
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailComponentLoaderSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('FundDetailComponentLoaderSectionContentComponent documentDownload -  clicked', () => {
    const documentName="Fact Sheet"
    expect(component.documentDownload(documentName)).toBeUndefined();
  });

  it('FundDetailComponentLoaderSectionContentComponent addToCartEvent', () => {
    const values = [{}]
    expect(component.addToCartEvent(values)).toBeUndefined();
  });

  it('FundDetailComponentLoaderSectionContentComponent removeFromCartEvent', () => {
    const values = [{}]
    expect(component.removeFromCartEvent(values)).toBeUndefined();
  });

  it('FundDetailComponentLoaderSectionContentComponent updateAmountInCartEvent', () => {
      const values = [{}]
    expect(component.updateAmountInCartEvent(values)).toBeUndefined();
  });

  it('should call clearAndAddNewToCartEvent()', () => {
    expect(component.clearAndAddNewToCartEvent({})).toBeUndefined();
  });
  it('should emit data for Redeem', ()=> {
    const obj = {
      "amount": "700.00",
      "flow": "002",
      "fund_code": "CBT40A",
      "unit": 700,
      "index": 0
  }
    expect(component.updateAmountInRedeemCartEvent(obj)).toBeUndefined();
  })

});
