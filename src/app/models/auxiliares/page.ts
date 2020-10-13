export class Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;

  constructor() {
    this.content = [];
    this.totalElements = 0;
    this.size = null;
    this.empty = true;
  }
}
