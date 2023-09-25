import { whitelistingUserReducer, initialState, State } from './whitelisting-user.reducer';
import * as WhitelistingUserActions from './whitelisting-user.actions';
import { WhitelistingTable } from '../../core/models/user-whitelisting.models';

describe('WhitelistingUserReducer', () => {
  let state: State;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should set loading to false and populate whitelistingTable on loadWhitelistingListSuccess action', () => {
    const whitelistingTable: WhitelistingTable = {
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
      };
    const action = WhitelistingUserActions.loadWhitelistingListSuccess({ whitelistingTable });
    const newState = whitelistingUserReducer(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.whitelistingTable).toBe(whitelistingTable);
    expect(newState.error).toBeNull();
  });

  it('should set loading to false and populate error on loadWhitelistingListFailure action', () => {
    const error = new Error('Some error');
    const action = WhitelistingUserActions.loadWhitelistingListFailure({ error });
    const newState = whitelistingUserReducer(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.whitelistingTable).toBeNull();
  });

  it('should set loading to true and clear error on deleteWhitelistingUser action', () => {
    const action = WhitelistingUserActions.deleteWhitelistingUser({ id: 123 });
    const newState = whitelistingUserReducer(state, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.whitelistingTable).toBeNull();
  });

  it('should set loading to false on deleteWhitelistingUserSuccess action', () => {
    const action = WhitelistingUserActions.deleteWhitelistingUserSuccess();
    const newState = whitelistingUserReducer(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.whitelistingTable).toBeNull();
  });

  it('should set loading to false and populate error on deleteWhitelistingUserFailure action', () => {
    const error = new Error('Failed to delete user');
    const action = WhitelistingUserActions.deleteWhitelistingUserFailure({ error });
    const newState = whitelistingUserReducer(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.whitelistingTable).toBeNull();
  });

});
