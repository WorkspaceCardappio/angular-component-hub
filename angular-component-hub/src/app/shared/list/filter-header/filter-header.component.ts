import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filter } from '../../../../model/filter.model';
import { DropdownItem } from '../../dropdown-menu-list/model/dropdown-item.model';

@Component({
  selector: 'app-filter-header',
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  templateUrl: './filter-header.component.html',
  styleUrl: './filter-header.component.scss',
})
export class FilterHeaderComponent {

  @Input({ required: true }) fieldFilter!: Partial<DropdownItem>;
  @Input({ required: true }) typeFilter!: string;

  @Output() newFilter: EventEmitter<Filter> = new EventEmitter();

  protected search = new FormControl('', Validators.required);

  onClick() {
    const filter = this.buildFilter();
    this.newFilter.emit(filter);
    this.clearSearch();
  }

  buildFilter(): Filter {
    return {
      field: this.fieldFilter.value!,
      condition: this.typeFilter,
      value: this.search.value!
    }
  }

  clearSearch() {
    this.search.setValue('');
  }
}
