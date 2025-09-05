import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import {Pageable} from '../model/pageable.model';
import {PageItem} from '../model/page-item.model';

@Component({
  selector: 'cardappio-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone: true,

})
export class PaginatorComponent implements OnInit {

  private readonly INITIAL_PAGE = 1;
  private readonly MORE_PAGES = '...';

  @Input({ required: true }) pageable!: Pageable;
  @Output() onChange: EventEmitter<number> = new EventEmitter();

  pages: PageItem[] = [];
  currentPage = signal(this.INITIAL_PAGE);

  ngOnInit(): void {
    this.currentPage.set(this.pageable.number + this.INITIAL_PAGE);
    this.buildPages();
  }

  buildPages() {

    const pages: PageItem[] = [];
    const total = this.pageable.totalPages;
    const current = this.currentPage();

    if (total <= 7) {

      for (let i = 1; i <= total; i++)
        this.addPage(pages, i, current === i);

      this.pages = pages;
      return;
    }

    if (current <= 4) {

      [1, 2, 3, 4, 5]
        .forEach(value => this.addPage(pages, value, current === value));

      this.addPage(pages, this.MORE_PAGES, false);
      this.addPage(pages, total, current === total);
      this.pages = pages;
      return;

    }

    if (current >= total - 3) {

      this.addPage(pages, this.INITIAL_PAGE, current === this.INITIAL_PAGE);
      this.addPage(pages, this.MORE_PAGES, false);

      for (let i = total - 4; i <= total; i++)
        this.addPage(pages, i, current === i);

      this.pages = pages;
      return;

    }

    this.addPage(pages, this.INITIAL_PAGE, current === this.INITIAL_PAGE);
    this.addPage(pages, this.MORE_PAGES, false);

    for (let i = current - 1; i <= current + 1; i++)
      this.addPage(pages, i, current === i);

    this.addPage(pages, this.MORE_PAGES, false);
    this.addPage(pages, total, current === total);

    this.pages = pages;
  }

  previousPage() {
    this.currentPage.update(current => current - this.INITIAL_PAGE);
    this.buildPages();
    this.onChange.emit(this.currentPage());
  }

  nextPage() {
    this.currentPage.update(current => current + this.INITIAL_PAGE);
    this.buildPages();
    this.onChange.emit(this.currentPage());
  }

  defineCurrentPage(value: number | string) {

    if (typeof value === 'string')
      return;

    this.currentPage.set(value);
    this.buildPages();
    this.onChange.emit(this.currentPage());
  }

  private addPage(pages: PageItem[], value: string | number, isActive: boolean) {
    pages.push({
      value: value,
      active: isActive,
      disabled: value === this.MORE_PAGES,
    });
  }

}
