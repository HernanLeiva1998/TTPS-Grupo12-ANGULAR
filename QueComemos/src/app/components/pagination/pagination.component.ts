import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() page: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  getPageRange(): (number | string)[] {
    const totalVisiblePages = 5;
    const currentPage = this.page.page;
    const totalPages = this.page.totalPages;
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    let startPage = Math.max(0, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages - 1, startPage + totalVisiblePages - 1);

    startPage = Math.max(0, endPage - totalVisiblePages + 1);

    const pageRange = [];
    if (startPage > 0) {
      pageRange.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }

    if (endPage < totalPages - 1) {
      pageRange.push('...');
    }

    return pageRange;
  }

  goToPage(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }

  goToNextOrPreviousPage(direction: string): void {
    const nextPage =
      direction === 'forward' ? this.page.page + 1 : this.page.page - 1;
    this.goToPage(nextPage);
  }

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  getPageItemClass(pageItem: number | string): string {
    return typeof pageItem === 'string'
      ? 'disabled'
      : pageItem === this.page.page
      ? 'active'
      : '';
  }
}
