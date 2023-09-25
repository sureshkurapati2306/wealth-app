import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardSwitchComponent } from './dashboard-switch.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { inputFundDefaultMockData, inputFundWithSwitchCartListMockData, inputFundZeroMinSwitchAmountMockData } from '@cimb/shared/services';
import { EventService, HighlightTextPipe } from '@cimb/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { of } from 'rxjs';

describe('DashboardSwitchComponent', () => {
  let component: DashboardSwitchComponent;
  let fixture: ComponentFixture<DashboardSwitchComponent>;
  let loader: HarnessLoader;
  let loaderDocumentRoot: HarnessLoader;
  let unitsInput: MatInputHarness;
  let addToCartButton: MatButtonHarness;
  let removeFromCartButton: MatButtonHarness;
  const service = TestBed.inject(EventService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSwitchComponent, HighlightTextPipe, DialogAlertComponent ],
      imports: [MatInputModule, MatCheckboxModule, ReactiveFormsModule, MatDialogModule, MatBottomSheetModule, HttpClientTestingModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DashboardSwitchComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;
    component.item = inputFundDefaultMockData;
    component.isPanelOpen = false;
    component.selectedAccount = 'A80054089';
    component.cartUTAccount = 'A80054089';
    component.cartFundCount = 0;
    component.flowText = 'switch';
    component.foreignerInd = 'N';
    component.occupationInd = 'N';

    unitsInput = await loader.getHarness(MatInputHarness.with({selector: '.custom-input'}));

    addToCartButton = await loader.getHarness(MatButtonHarness.with({text: 'Add to cart'}));

  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should test switch out input with zero value', async () => {

    component.item = inputFundZeroMinSwitchAmountMockData;

    component.ngOnInit();

    fixture.detectChanges();
      
    await unitsInput.focus(); // test focus
    
    await unitsInput.blur(); // test blur

    expect(component).toBeTruthy();

  });

  it('should test if full switch transaction popup closed', () => {
      const mockResponse = { fullSwitch: true };
      jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

      service.onReceived().subscribe((result) => {
          expect(result).toEqual(mockResponse);
      });
  })

  it('should test switch out input flow and add to cart', async () => {
    fixture.detectChanges();
      
    await unitsInput.focus(); // test focus
    
    await unitsInput.blur(); // test blur

    await unitsInput.setValue('');  //test input blank

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('1,300.12');  //test input accepted units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('0');  //test input below min units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('1,300,000.12');  //test input above max units

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('0100.1');  //test input with weird formatting

    await unitsInput.blur(); // test blur

    await unitsInput.setValue('.1');  //test input with weird formatting
    
    await unitsInput.blur(); // test blur

    await unitsInput.setValue('1.');  //test input with weird formatting

    await unitsInput.blur(); // test blur

    component.sliderValueChangeEvent(0);  //set value from slider

    component.sliderValueChangeEvent(1000.5);  //set value from slider
    
    component.sliderValueChangeEvent(10000);  //set value from slider

    component.sliderValueChangeEvent('01000.5');  //test input with weird formatting

    component.sliderValueChangeEvent('.1');  //test input with weird formatting

    component.sliderValueChangeEvent('1.');  //test input with weird formatting
    
    await addToCartButton.click();

    expect(component).toBeTruthy();
  });


  it('should failed to add to cart because of above minimum hold requirements - close action', async () => {
    fixture.detectChanges();

    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const minHoldingAlertDialog = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(minHoldingAlertDialog.length).toBe(1);

    minHoldingAlertDialog[0].close();
    
    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should failed to add to cart because of above minimum hold requirements - Switch all and add to cart action', async () => {
    fixture.detectChanges();

    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const minHoldingAlertDialog = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(minHoldingAlertDialog.length).toBe(1);

    const switchAllAndAddToCartButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Switch all and add to cart'}));

    await switchAllAndAddToCartButton.click();
    
    expect(component.unitsAdded).toBeTruthy()
    expect(component.inputUnits.value).toEqual(inputFundDefaultMockData.unit_held);
    
  });

  it('should failed to add to cart because of failing AML validation - close action', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const amlAlertDialog = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(amlAlertDialog.length).toBe(1);

    const closeButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Close'}));

    await closeButton.click();
    
    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should failed to add to cart because there are other items in cart for other UT account than the current one - close action', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const dialogPendingTransactionInOtherAccount = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);
    
    expect(dialogPendingTransactionInOtherAccount.length).toBe(1);

    const closeButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Cancel'}));

    await closeButton.click();

    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should failed first time to add to cart because there are other items in cart for other UT account than the current one - then clicked Yes, clear cart and continue', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(3500);  //set value from slider

    await addToCartButton.click();

    const dialogPendingTransactionInOtherAccount = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogPendingTransactionInOtherAccount.length).toBe(1);

    const proceedButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Yes, clear cart and continue'}));

    await proceedButton.click();
    
    expect(component.unitsAdded).toBeTruthy();
    
  });

  it('should failed first time to add to cart because there are other items in cart for other UT account than the current one - then clicked Yes, clear cart and continue - for full switch out scenario', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const dialogPendingTransactionInOtherAccount = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);
    
    expect(dialogPendingTransactionInOtherAccount.length).toBe(1);

    const proceedButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Yes, clear cart and continue'}));

    await proceedButton.click();
    
    const dialogMinimumHoldingRequirements = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogMinimumHoldingRequirements.length).toBe(1);

    expect(component.unitsAdded).toBeFalsy();

    const proceedButton2 = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Switch all and add to cart'}));

    await proceedButton2.click();

    expect(component.unitsAdded).toBeTruthy();
    
  });

  it('should failed to add to cart because there are other items in cart not belonging to the same flow - topup flow - close action', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const dialogPendingOtherTransactionCart = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);
    
    expect(dialogPendingOtherTransactionCart.length).toBe(1);

    const closeButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Cancel'}));

    await closeButton.click();

    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should failed to add to cart because there are other items in cart not belonging to the same flow - redeem flow - close action', async () => {
    
    fixture.detectChanges();
    
    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const dialogPendingOtherTransactionCart = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);
    
    expect(dialogPendingOtherTransactionCart.length).toBe(1);

    const closeButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Cancel'}));

    await closeButton.click();

    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should failed to add to cart because there are other items in cart not belonging to the same flow - redeem flow - then clicked Yes, clear cart and continue', async () => {
    
    fixture.detectChanges();

    component.sliderValueChangeEvent(35000);  //set value from slider

    await addToCartButton.click();

    const dialogPendingOtherTransactionCart = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);
    
    expect(dialogPendingOtherTransactionCart.length).toBe(1);

    const proceedButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Yes, clear cart and continue'}));

    await proceedButton.click();

    expect(component.unitsAdded).toBeFalsy();
    
  });

  it('should removeUnitFromCart', async () => {
    fixture.detectChanges();

    component.sliderValueChangeEvent(10000);  //set value from slider

    await addToCartButton.click();

    removeFromCartButton = await loader.getHarness(MatButtonHarness.with({text: 'Remove'}));

    await removeFromCartButton.click();

    expect(component.removeUnitFromCart(null)).toBeUndefined();
  });

  it('should not load SwitchIn fund list', () => {
    fixture.detectChanges();
  });

  it('should prepopulate SwitchIn fund and units from cart list', () => {

    fixture = TestBed.createComponent(DashboardSwitchComponent);
    component = fixture.componentInstance;
    component.item = inputFundWithSwitchCartListMockData;
    fixture.detectChanges();

    expect(component.inputUnits.value).toEqual('5,594.00');
  });

  

  it('should openFundDetails', () => {
    fixture.detectChanges();

    expect(component.openFundDetails()).toBeUndefined();
  });

  it('should openIndicativeAmountActionSheet', () => {
    fixture.detectChanges();

    expect(component.openIndicativeAmountActionSheet()).toBeUndefined();
  });

});
