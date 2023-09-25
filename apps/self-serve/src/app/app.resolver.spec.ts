import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { InitialDataResolver } from './app.resolvers';

describe('InitialDataResolver', () => {
  let resolver: InitialDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
    ],
    });
    resolver = TestBed.inject(InitialDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
