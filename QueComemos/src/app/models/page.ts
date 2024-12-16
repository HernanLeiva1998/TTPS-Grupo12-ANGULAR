export interface Page<T> {
  content: T[];
  totalElements: number;
  page: number;
  size: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
