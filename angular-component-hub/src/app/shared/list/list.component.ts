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
import { OrderItem } from '../../model/order-item.model';
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
    ColumnListComponent
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
  typeValueFilter: WritableSignal<string> = signal('');

  page: number = 1;
  size: number = 20;
  activeFilters: Filter[] = [];
  activeOrders: OrderItem[] = [];

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
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

    const index = this.activeFilters.findIndex((value) => value.field === filter.field && value.condition === filter.condition);

    index > -1
      ? this.activeFilters[index] = filter
      : this.activeFilters.push(filter);

    this.onRefreshList();
  }

  newOrder(orderItem: OrderItem) {

    const index = this.activeOrders.findIndex((value) => value.field === orderItem.field);

    if (index === -1) {
      this.activeOrders.push(orderItem);
      this.onRefreshList();
      return;
    }

    if (orderItem.order === 'none') {
      this.activeOrders.splice(index, 1);
      this.onRefreshList();
      return;
    }

    this.activeOrders[index] = orderItem
    this.onRefreshList();
  }

  onRefreshList() {

    const params: RequestParams = {
      filters: this.activeFilters,
      orders: this.activeOrders,
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

  changeOperationFilter(value: string) {
    this.typeValueFilter.set(value);
  }

}
