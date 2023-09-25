import { Observable } from 'rxjs';
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,

} from "@angular/common/http/testing";
import { LogoutEffects } from "./logout.effects";
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe("LogoutEffects", () => {
  let actions$: Observable<any>;
  let effects: LogoutEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
               RouterTestingModule],
      providers: [
        LogoutEffects,
        provideMockActions(() => actions$),

      ]
    });
    effects = TestBed.inject<LogoutEffects>(LogoutEffects);

  });

  it("can load instance", () => {
    expect(effects).toBeTruthy();
  });

});
