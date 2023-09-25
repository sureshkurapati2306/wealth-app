import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackofficeLayoutComponent } from './backoffice-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogPromptComponent } from '@cimb/mint-office';
import { MemoizedSelector } from '@ngrx/store';
import * as authSelector from 'libs/mint-office/src/lib/mint-office-feature-login/+state/auth.selectors';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

let mockGetToken: MemoizedSelector<Record<string, unknown>, string>;

describe('BackofficeLayoutComponent', () => {
  let component: BackofficeLayoutComponent;
  let fixture: ComponentFixture<BackofficeLayoutComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        BackofficeLayoutComponent,
        DialogPromptComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        provideMockStore({ initialState: {} })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockGetToken = store.overrideSelector(
      authSelector.getToken,
      ''
    );
    fixture = TestBed.createComponent(BackofficeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('BackofficeLayoutComponent should create', (done) => {

    setTimeout(() => {
      //to ensure setTimeout inside tap() is ran
      done()
    }, 10);
    
    mockGetToken.setResult('auth_token');
    store.refreshState();
    
    expect(component).toBeTruthy();
  });

  it('Should logout() - Confirm & no browser', async() => {

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Confirm & Chrome browser', async() => {

    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Chrome');

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Confirm & Firefox browser', async() => {

    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Firefox');

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Confirm & Safari browser', async() => {

    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Safari');

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Confirm & Opera browser', async() => {

    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Opr/');

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Confirm & Edge browser', async() => {

    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Edge');

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const logoutButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Logout'}));

    await logoutButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

  it('Should logout() - Cancel', async() => {

    const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);

    component.logout();

    let dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);

    const cancelButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'Cancel'}));

    await cancelButton.click();

    dialogs = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(0);
    
  });

});
