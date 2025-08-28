import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../../../model/filter.model';

@Component({
  selector: 'app-active-filter',
  imports: [],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.scss'
})
export class ActiveFilterComponent {

  @Input({ required: true }) filters!: Filter[];

  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onRemoveAll: EventEmitter<void> = new EventEmitter();

  removeByIndex(index: number) {
    this.onRemove.emit(index);
  }

  removeAll() {
    this.onRemoveAll.emit();
  }

}
