import { Component, computed, EventEmitter, input, Input, Output } from '@angular/core';
import { DropdownMenuListComponent } from "../dropdown-menu-list/dropdown-menu-list.component";
import { DropdownItem } from '../dropdown-menu-list/model/dropdown-item.model';
import { ParamsDropdown } from '../dropdown-menu-list/model/params-dropdown.model';

@Component({
  selector: 'cardappio-dropdown-type-filter',
  imports: [DropdownMenuListComponent],
  templateUrl: './dropdown-type-filter.component.html',
  standalone: true,
})
export class DropdownTypeFilterComponent {

  selected: Partial<DropdownItem> | undefined;

  @Input() params: Partial<ParamsDropdown> | undefined;

  readonly type = input<'string' | 'number' | 'boolean'>('string');

  @Output() selectedChange: EventEmitter<Partial<DropdownItem>> = new EventEmitter();

  itemsToSelect = computed(() => {

    if (this.type() === 'string')
      return this.itemsToString();

    if (this.type() === 'number')
      return this.itemsToNumber();

    return this.itemsToBoolean();
  });

  onSelect(item: Partial<DropdownItem>) {
    this.selected = item;
    this.selectedChange.emit(item);
  }

  private itemsToString() {
    return [
      { icon: 'fa-solid fa-equals', value: '==', title: 'Igual' },
      { icon: 'fa-solid fa-not-equal', value: '!=', title: 'Diferente' },
      { icon: 'fa-solid fa-percent', value: 'teste7', title: 'Contém' },
    ];
  }

  private itemsToNumber() {
    return [
      { icon: 'fa-solid fa-equals', value: '==', title: 'Igual' },
      { icon: 'fa-solid fa-not-equal', value: '!=', title: 'Diferente' },
      { icon: 'fa-solid fa-greater-than-equal', value: 'teste3', title: 'Maior ou Igual' },
      { icon: 'fa-solid fa-less-than-equal', value: 'teste4', title: 'Menor ou Igual' },
      { icon: 'fa-solid fa-greater-than', value: 'teste5', title: 'Maior' },
      { icon: 'fa-solid fa-less-than', value: 'teste6', title: 'Menor' },
    ];
  }

  private itemsToBoolean() {
    return [
      { icon: 'fa-solid fa-equals', value: '==', title: 'Menor' },
      { icon: 'fa-solid fa-not-equal', value: '!=', title: 'Maior' },
    ];
  }

}
