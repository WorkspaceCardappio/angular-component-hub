import { Component, computed, EventEmitter, input, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { DropdownMenuListComponent } from "../dropdown-menu-list/dropdown-menu-list.component";
import { DropdownItem } from '../dropdown-menu-list/model/dropdown-item.model';
import { ParamsDropdown } from '../dropdown-menu-list/model/params-dropdown.model';

@Component({
  selector: 'app-dropdown-type-filter',
  imports: [DropdownMenuListComponent],
  templateUrl: './dropdown-type-filter.component.html'
})
export class DropdownTypeFilterComponent {

  selected: Partial<DropdownItem>| undefined;

  @Input() params: Partial<ParamsDropdown> | undefined;

  readonly type = input<'string' | 'number' | 'boolean'>('string');

  @Output() selectedChange: EventEmitter<string> = new EventEmitter();

  itemsToSelect = computed(() => {

    if (this.type() === 'string') return this.setItems(this.itemsToString());

    if (this.type() === 'number') return this.setItems(this.itemsToNumber());

    return this.setItems(this.itemsToBoolean());
  });

  setItems = (items: Partial<DropdownItem>[]) => {

    if (!this.selected) {
      return items;
    }

    return [...items.filter(value => value.value !== this.selected?.value)];
  }

  onSelect(item: Partial<DropdownItem>) {
    this.selected = item;
    this.selectedChange.emit(item.value || '==');
  }

  private itemsToString() {
    return [
      { icon: 'fa-solid fa-equals', value: '==' },
      { icon: 'fa-solid fa-not-equal', value: '!=' },
      { icon: 'fa-solid fa-percent', value: 'teste7' },
    ];
  }

  private itemsToNumber() {
    return [
      { icon: 'fa-solid fa-equals', value: '==' },
      { icon: 'fa-solid fa-not-equal', value: '!=' },
      { icon: 'fa-solid fa-greater-than-equal', value: 'teste3' },
      { icon: 'fa-solid fa-less-than-equal', value: 'teste4' },
      { icon: 'fa-solid fa-greater-than', value: 'teste5' },
      { icon: 'fa-solid fa-less-than', value: 'teste6' },
    ];
  }

  private itemsToBoolean() {
    return [
      { icon: 'fa-solid fa-equals', value: '==' },
      { icon: 'fa-solid fa-not-equal', value: '!=' },
    ];
  }

}
