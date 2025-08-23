import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Pageable } from '../../model/pageable.model';
import { ActionsListComponent } from "../actions-list/actions-list.component";
import { GenericButtonComponent } from "../button/generic/generic.component";
import { PageSizeComponent } from "../page-size/page-size.component";
import { PaginatorComponent } from '../paginator/paginator.component';
import { ListParams } from './params/list-params.model';
import { DropdownMenuListComponent } from "../dropdown-menu-list/dropdown-menu-list.component";
import { DropdownTypeFilterComponent } from "../dropdown-type-filter/dropdown-type-filter.component";
import { DropdownItem } from '../dropdown-menu-list/model/dropdown-item.model';

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
    DropdownTypeFilterComponent
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  @Input({ required: true }) params!: Partial<ListParams>;
  @Input() showActions = true;

  @Input() quantityPages: number[] = [20, 5, 10, 50, 100];

  responseData: Pageable = { content: [], empty: false, first: false, last: false, number: 0, totalPages: 30 } as any;

  gridTemplateColumns: string | undefined;

  typeFilter: 'string' | 'number' | 'boolean' = 'string';

  constructor(
    private readonly _router: Router
  ) {}

  ngOnInit(): void {

    for(let i = 0; i < 10; i++) {
      this.responseData.content.push({ universo: 'universo' + i, mundo: 'mundo', ricardo: 'ricardo', teste: 'teste', id: i, kenji: 'teste' });
    }

    this.buildTemplateColumns();
  }

  detectChangePageSize(value: number) {
    console.log('Mudou size fazer o findAll Com tamanho diferente:' + value);
  }

  detectChangePage(value: number) {
    console.log('Mudou page findAll Com tamanho diferente:' + value);
  }

  goToNew() {
    this._router.navigate([`${this.params.route}/new`])
  }

  buildTemplateColumns() {

    this.gridTemplateColumns = (this.params.columns || [])
      .map(column => `${column.size || 3}fr`)
      .join(' ');

    if (this.showActions)
      this.gridTemplateColumns += ' 1fr';
  }

  changeTypeFilter(value: Partial<DropdownItem>) {
    this.typeFilter = value.typeValue!;
  }

  changeOperationFilter(value: string) {
    console.log(value);
  }

}
