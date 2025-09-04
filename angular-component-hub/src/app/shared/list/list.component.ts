import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from '../../../model/filter.model';
import { SortItem } from '../../model/order-item.model';
import { Pageable } from '../../model/pageable.model';
import { RequestParams } from '../../model/request-params.model';
import { ActionsListComponent } from '../actions-list/actions-list.component';
import { GenericButtonComponent } from '../button/generic/generic.component';
import { DropdownMenuListComponent } from '../dropdown-menu-list/dropdown-menu-list.component';
import { DropdownItem } from '../dropdown-menu-list/model/dropdown-item.model';
import { DropdownTypeFilterComponent } from '../dropdown-type-filter/dropdown-type-filter.component';
import { PageSizeComponent } from '../page-size/page-size.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { RequestUtils } from '../utils/request-utils';
import { ActiveFilterComponent } from './active-filter/active-filter.component';
import { ColumnListComponent } from "./column-list/column-list.component";
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { ListParams } from './params/list-params.model';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    PaginatorComponent,
    PageSizeComponent,
    GenericButtonComponent,
    GenericButtonComponent,
    ActionsListComponent,
    DropdownMenuListComponent,
    DropdownTypeFilterComponent,
    FilterHeaderComponent,
    ColumnListComponent,
    ActiveFilterComponent
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {

  @Input({ required: true }) params!: Partial<ListParams>;
  @Input() showActions = true;

  @Input() quantityPages: number[] = [20, 5, 10, 50, 100];

  responseData: Pageable = {
    content: [],
    empty: false,
    first: false,
    last: false,
    number: 0,
    totalPages: 30,
  } as any;

  gridTemplateColumns: string | undefined;

  selectedFilter: WritableSignal<Partial<DropdownItem>> = signal({});
  typeValueFilter: WritableSignal<Partial<DropdownItem>> = signal({});

  page: number = 1;
  size: number = 20;
  activeFilters: WritableSignal<Filter[]> = signal([]);
  activeSorts: SortItem[] = [];

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {

    // TODO: CHAMAR SERVICE

    for (let i = 0; i < 10; i++) {
      this.responseData.content.push({
        universo: 'universo' + i,
        mundo: 'mundo',
        ricardo: 'ricardo',
        teste: 'teste',
        id: i,
        kenji: 'teste',
      });
    }

    this.buildTemplateColumns();
  }

  detectChangePageSize(value: number) {
    this.size = value;
    this.onRefreshList();
  }

  detectChangePage(value: number) {
    this.page = value;
    this.onRefreshList();
  }

  newFilter(filter: Filter) {

    this.activeFilters.update(filters => {
      const index = filters.findIndex(f => f.field === filter.field && f.condition === filter.condition);

      return index > -1
        ? [...filters.slice(0, index), filter, ...filters.slice(index + 1)]
        : [...filters, filter];
    });

    this.onRefreshList();
  }

  newSort(sortItem: SortItem) {

    const index = this.activeSorts.findIndex((value) => value.field === sortItem.field);

    if (index === -1) {
      this.activeSorts.push(sortItem);
      this.onRefreshList();
      return;
    }

    if (sortItem.order === 'none') {
      this.activeSorts.splice(index, 1);
      this.onRefreshList();
      return;
    }

    this.activeSorts[index] = sortItem;
    this.onRefreshList();
  }

  onRefreshList() {

    const params: RequestParams = {
      filters: this.activeFilters(),
      orders: this.activeSorts,
      page: this.page,
      size: this.size
    };

    const completeSearch = RequestUtils.buildRequest(params);
    console.log(completeSearch);
    this.params.service?.findAllDTO(completeSearch)
      .subscribe(value => console.log(value));
  }

  goToNew() {
    this._router.navigate([`${this.params.route}/new`]);
  }

  buildTemplateColumns() {
    this.gridTemplateColumns = (this.params.columns || [])
      .map((column) => `${column.size || 3}fr`)
      .join(' ');

    if (this.showActions) this.gridTemplateColumns += ' 1fr';
  }

  changeTypeFilter(value: Partial<DropdownItem>) {
    this.selectedFilter.set(value);
  }

  changeOperationFilter(value: Partial<DropdownItem>) {
    this.typeValueFilter.set(value);
  }

  removeFilter(indexToRemove: number) {
    this.activeFilters.update(filters => filters.filter((_, index) => index !== indexToRemove));
    this.onRefreshList();
  }

  removeAllFilters() {
    this.activeFilters.set([]);
    this.onRefreshList();
  }

}
