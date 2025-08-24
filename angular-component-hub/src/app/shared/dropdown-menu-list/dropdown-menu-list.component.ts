import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { DropdownItem } from './model/dropdown-item.model';
import { ParamsDropdown } from './model/params-dropdown.model';


@Component({
  selector: 'app-dropdown-menu-list',
  imports: [CommonModule],
  templateUrl: './dropdown-menu-list.component.html',
  styleUrl: './dropdown-menu-list.component.scss'
})
export class DropdownMenuListComponent implements OnInit {

  // TODO: falta definir a troca de cores
  // BUG: Selected que não existe em outra lista não some - Ouvir mudancas da lista e caso não tenha por o primeiro no selected

  selected: WritableSignal<Partial<DropdownItem>> = signal({});
  @Input({ required: true }) items!: Partial<DropdownItem>[];

  @Input() params: Partial<ParamsDropdown> | undefined;
  @Output() selectedChange: EventEmitter<Partial<DropdownItem>> = new EventEmitter();

  protected internalItems: Partial<DropdownItem>[] = [];

  ngOnInit(): void {

    this.internalItems = [...this.items];

    if (this.internalItems.length) {
      const item = this.internalItems.shift()!
      this.selected = signal(item);
      this.selectedChange.emit(item);
    }
  }

  selectItem(value: Event) {

    const itemSelected = (value.currentTarget as HTMLSelectElement).id;
    const item = this.internalItems.find(item => item.value === itemSelected);

    if (!item)
      return;

    const oldValue = this.selected();

    this.internalItems = [oldValue, ...this.internalItems.filter(value => value !== item)];
    this.selected.set(item);
    this.selectedChange.emit(item);
  }

}
