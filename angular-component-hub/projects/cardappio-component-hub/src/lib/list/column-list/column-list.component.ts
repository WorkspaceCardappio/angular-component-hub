import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import {SortItem} from '../../model/order-item.model';

@Component({
  selector: 'cardappio-column-list',
  imports: [CommonModule],
templateUrl: './column-list.component.html',
  styleUrl: './column-list.component.scss'
})
export class ColumnListComponent {

  @Input({ required: true }) title!: string;
  @Input({ required: true }) order: string | undefined;

  typeSort: WritableSignal<'none' | 'desc' | 'asc'> = signal('none');

  @Output() onChangeEmitter: EventEmitter<SortItem> = new EventEmitter();

  onClickSort() {
    this.changeTypeSort();
    const newSort = this.buildSort();
    this.onChangeEmitter.emit(newSort);
  }

  changeTypeSort() {

    if (this.typeSort() === 'none') {
      this.typeSort.set('asc');
      return;
    }

    if (this.typeSort() === 'asc') {
      this.typeSort.set('desc');
      return;
    }

    this.typeSort.set('none');
  }

  private buildSort(): SortItem {
    return {
      field: this.order!,
      order: this.typeSort()
    }
  }
}
