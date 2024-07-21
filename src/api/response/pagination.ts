export class ResponsePageLinks {
  first: string;
  last: string;
  next: string;
  previous: string;

  constructor() {
    this.first = "";
    this.last = "";
    this.next = "";
    this.previous = "";
  }
}

export class ResponsePageMeta {
  currentPage: number;
  itemCount: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;

  constructor() {
    this.currentPage = 0;
    this.itemCount = 0;
    this.itemPerPage = 0;
    this.totalItems = 0;
    this.totalPages = 0;
  }
}
