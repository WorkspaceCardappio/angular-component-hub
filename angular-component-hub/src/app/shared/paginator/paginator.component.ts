import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Pageable } from '../../model/pageable.model';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit {

  readonly INITIAL_PAGE = 1;

  @Input({ required: true }) pageable!: Pageable;

  pages: string[] = [];
  currentPage = signal(`${this.INITIAL_PAGE}`);

  ngOnInit(): void {
    this.currentPage.set(`${this.pageable.number + this.INITIAL_PAGE}`);
    this.buildPages();
  }

  buildPages() {

    // TODO: passar um objeto para o front com disable, active e value

    const pages: string[] = [];

    if (this.pageable.totalPages <= 7) {

      for (let i = 1; i <= this.pageable.totalPages; i++) {
        pages.push(`${i}`);
      }

      this.pages = pages;
      return;
    }

    if (parseInt(this.currentPage()) <= 4) {
      pages.push('1', '2', '3', '4', '5', '...', `${this.pageable.totalPages}`);
    } else if (parseInt(this.currentPage()) >= this.pageable.totalPages - 3) {
      pages.push('1', '...', `${this.pageable.totalPages - 4}`, `${this.pageable.totalPages - 3}`, `${this.pageable.totalPages - 2}`, `${this.pageable.totalPages - 1}`, `${this.pageable.totalPages}`);
    } else {
      pages.push('1', '...', `${parseInt(this.currentPage()) - 2}`, `${parseInt(this.currentPage()) - 1}`, `${parseInt(this.currentPage()) + 1}`, '...', `${this.pageable.totalPages}`);
    }

    this.pages = pages;
  }

  previousPage() {
    this.currentPage.update(current => `${parseInt(current) - this.INITIAL_PAGE}`);
    this.buildPages();
  }

  nextPage() {
    this.currentPage.update(current => `${parseInt(current) + this.INITIAL_PAGE}`);
    this.buildPages();
  }

  defineCurrentPage(value: string) {
    this.currentPage.set(value);
    this.buildPages();
  }

}
