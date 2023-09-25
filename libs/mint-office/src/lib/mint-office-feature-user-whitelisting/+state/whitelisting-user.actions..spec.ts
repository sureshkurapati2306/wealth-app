import {
    loadWhitelistingList,
    loadWhitelistingListSuccess,
    loadWhitelistingListFailure,
    deleteWhitelistingUser,
    deleteWhitelistingUserSuccess,
    deleteWhitelistingUserFailure,
  } from './whitelisting-user.actions';
  import { WhitelistingTable } from '../../core/models/user-whitelisting.models';
  
  describe('Whitelisting User Actions', () => {
    const mockWhitelistingTable: WhitelistingTable = {
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
    
    it('should create loadWhitelistingList action with search and pageIndex', () => {
      const action = loadWhitelistingList({ search: 'some query', pageIndex: 1 });
      expect(action.type).toBe('[Whitelisting User] Load List');
      expect(action.search).toBe('some query');
      expect(action.pageIndex).toBe(1);
    });
  
    it('should create loadWhitelistingListSuccess action', () => {
      const action = loadWhitelistingListSuccess({ whitelistingTable: mockWhitelistingTable });
      expect(action.type).toBe('[Whitelisting User] Load List Success');
      expect(action.whitelistingTable).toBe(mockWhitelistingTable);
    });
  
    it('should create loadWhitelistingListFailure action', () => {
      const error = new Error('Failed to load whitelisting list');
      const action = loadWhitelistingListFailure({ error });
      expect(action.type).toBe('[Whitelisting User] Load List Failure');
      expect(action.error).toBe(error);
    });
  
    it('should create deleteWhitelistingUser action with id', () => {
      const action = deleteWhitelistingUser({ id: 123 });
      expect(action.type).toBe('[Whitelisting User] Delete User');
      expect(action.id).toBe(123);
    });
  
    it('should create deleteWhitelistingUserSuccess action', () => {
      const action = deleteWhitelistingUserSuccess();
      expect(action.type).toBe('[Whitelisting User] Delete User Success');
    });
  
    it('should create deleteWhitelistingUserFailure action', () => {
      const error = new Error('Failed to delete user');
      const action = deleteWhitelistingUserFailure({ error });
      expect(action.type).toBe('[Whitelisting User] Delete User Failure');
      expect(action.error).toBe(error);
    });
  });
  