import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { WhitelistingUserEffects } from './whitelisting-user.effects';
import * as WhitelistingUserActions from './whitelisting-user.actions';
import { WhitelistingUserService } from '../../core/services/whitelisting-user.service';

describe('WhitelistingUserEffects', () => {
  let actions$: Observable<any>;
  let effects: WhitelistingUserEffects;
  let mockWhitelistingUserService: Partial<WhitelistingUserService>;

  beforeEach(() => {
    mockWhitelistingUserService = {
      getWhitelistingListUser: jest.fn(),
      deleteWhitelistingUser: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        WhitelistingUserEffects,
        provideMockActions(() => actions$),
        { provide: WhitelistingUserService, useValue: mockWhitelistingUserService },
      ],
    });

    effects = TestBed.inject(WhitelistingUserEffects);
  });

  describe('loadWhitelistingList$', () => {
    it('should dispatch loadWhitelistingListSuccess action', () => {
      const action = WhitelistingUserActions.loadWhitelistingList({ search: 'query', pageIndex: 1 });

      const mockdatatable = {
        "content": [
          {
            "id": 81,
            "startDate": "2023-03-27T16:00:00.000+00:00",
            "endDate": "2023-03-27T16:00:00.000+00:00",
            "name": "MMNNOO",
            "idType": "5",
            "idNo": "B567821",
            "productId": "PRS",
            "privilege": "No",
            "lastUpdated": null
          },
          {
            "id": 82,
            "startDate": "2023-03-27T16:00:00.000+00:00",
            "endDate": "2023-03-27T16:00:00.000+00:00",
            "name": "MMNNOO",
            "idType": "5",
            "idNo": "B567821",
            "productId": "PRS",
            "privilege": "No",
            "lastUpdated": null
          }
        ],
        "pageable": {
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "pageNumber": 0,
          "pageSize": 20,
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 1,
        "totalElements": 20,
        "last": true,
        "first": true,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "numberOfElements": 20,
        "size": 20,
        "number": 0,
        "empty": false
      }
      const outcome = WhitelistingUserActions.loadWhitelistingListSuccess({ whitelistingTable:  mockdatatable});

      actions$ = of(action);
      mockWhitelistingUserService.getWhitelistingListUser = jest.fn(() => of(/* mock data */));

      effects.loadWhitelistingList$.subscribe(resultAction => {
        expect(resultAction).toEqual(outcome);
      });
    });

    it('should dispatch loadWhitelistingListFailure action on error', () => {
      const action = WhitelistingUserActions.loadWhitelistingList({ search: 'query', pageIndex: 1 });
      const error = new Error('Some error');
      const outcome = WhitelistingUserActions.loadWhitelistingListFailure({ error });

      actions$ = of(action);
      mockWhitelistingUserService.getWhitelistingListUser = jest.fn(() => throwError(error));

      effects.loadWhitelistingList$.subscribe(resultAction => {
        expect(resultAction).toEqual(outcome);
      });
    });
  });

  describe('deleteWhitelistingUser$', () => {
    it('should dispatch deleteWhitelistingUserSuccess action', () => {
      const action = WhitelistingUserActions.deleteWhitelistingUser({ id: 123 });
      const outcome = WhitelistingUserActions.deleteWhitelistingUserSuccess();

      actions$ = of(action);
      mockWhitelistingUserService.deleteWhitelistingUser = jest.fn(() => of(undefined));

      effects.deleteWhitelistingUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(outcome);
      });
    });

    it('should dispatch deleteWhitelistingUserFailure action on error', () => {
      const action = WhitelistingUserActions.deleteWhitelistingUser({ id: 123 });
      const error = new Error('Failed to delete user');
      const outcome = WhitelistingUserActions.deleteWhitelistingUserFailure({ error });

      actions$ = of(action);
      mockWhitelistingUserService.deleteWhitelistingUser = jest.fn(() => throwError(error));

      effects.deleteWhitelistingUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(outcome);
      });
    });
  });
});
