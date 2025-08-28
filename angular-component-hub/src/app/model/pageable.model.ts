export interface Pageable {
  content: any[],
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  size: number,
  totalElements: number,
  totalPages: number,
  sort: any,
  pageable: any
}
