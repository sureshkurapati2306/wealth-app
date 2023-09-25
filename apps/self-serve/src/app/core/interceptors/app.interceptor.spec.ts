import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { AppInterceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [AppInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

