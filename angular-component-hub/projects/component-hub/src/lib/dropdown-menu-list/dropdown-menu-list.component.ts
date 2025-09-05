import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { DropdownItem } from './model/dropdown-item.model';
import { ParamsDropdown } from './model/params-dropdown.model';

@Component({
  selector: 'cardappio-dropdown-menu-list',
  imports: [CommonModule],
  templateUrl: './dropdown-menu-list.component.html',
  styleUrl: './dropdown-menu-list.component.scss',
  standalone: true,
})
export class DropdownMenuListComponent implements OnInit {

  // TODO: falta definir a troca de cores

  selected: WritableSignal<Partial<DropdownItem>> = signal({});
  items = input.required<Partial<DropdownItem>[]>();

  @Input() params: Partial<ParamsDropdown> | undefined;
  @Output() selectedChange: EventEmitter<Partial<DropdownItem>> = new EventEmitter();

  internalItems = signal<Partial<DropdownItem>[]>([]);

  constructor() {
    effect(() => this.updateItems());
  }

  updateItems() {

    const items = this.items();
    const selected = this.selected();

    const existsSelected = items.some((item) => item.value === selected?.value);
    this.internalItems.set(items.filter((item) => item.value !== selected?.value));

    if (!existsSelected && this.internalItems().length) {
      this.selected.set(this.internalItems()[0]);
    }
  }

  ngOnInit(): void {
    if (!this.items().length) return;

    this.internalItems.set([...this.items()]);
    const item = this.internalItems().shift()!;
    this.selected = signal(item);
    this.selectedChange.emit(item);
  }

  selectItem(value: Event) {
    const itemSelected = (value.currentTarget as HTMLSelectElement).id;
    const item = this.internalItems().find((item) => item.value === itemSelected);

    if (!item) return;

    const oldValue = this.selected();

    this.internalItems.set([oldValue, ...this.internalItems().filter((value) => value !== item)]);
    this.selected.set(item);
    this.selectedChange.emit(item);
  }
}
