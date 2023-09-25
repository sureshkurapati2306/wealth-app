import { State } from './whitelisting-user.reducer';
import * as selectors from './whitelisting-user.selectors';

describe('Whitelisting User Selectors', () => {
  const mockState: State = {
    whitelistingTable: {
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
      },
    loading: false,
    error: null,
  };

  it('should select the whitelistingTable', () => {
    const selectedTable = selectors.selectWhitelistingTable.projector(mockState);

    expect(selectedTable).toBe(mockState.whitelistingTable);
  });

  it('should select the loading state', () => {
    const selectedLoading = selectors.selectLoading.projector(mockState);

    expect(selectedLoading).toBe(mockState.loading);
  });

  it('should select the error state', () => {
    const selectedError = selectors.selectError.projector(mockState);

    expect(selectedError).toBe(mockState.error);
  });
});
