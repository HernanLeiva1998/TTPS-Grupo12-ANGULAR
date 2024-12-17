import { Page } from '../../../models/page';
import { AlertService } from '../../../services/alert/alert.service';

export abstract class PageComponent<T> {
  page: Page<T>;

  constructor(protected alertService: AlertService) {
    this.page = {
      content: [],
      totalElements: 0,
      page: 0,
      size: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    };
  }

  onPageChange(page: number) {
    this.fetchPageData(page);
  }

  checkForPageData(): void {
    this.fetchPageData();
  }

  abstract fetchPageData(pageNumber?: number): void;
}
