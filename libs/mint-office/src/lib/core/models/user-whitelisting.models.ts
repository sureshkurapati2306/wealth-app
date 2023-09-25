export class WhitelistingTable {
    content: ContentItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  }
  
  export class ContentItem {
    endDate: string;
    id: number;
    idNo: string;
    idType: string;
    lastUpdated: string;
    name: string;
    privilege: string;
    productId: string;
    startDate: string;
  }
  
  export class Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
  }
  
  export class Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  