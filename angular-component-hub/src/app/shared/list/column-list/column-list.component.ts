import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { OrderItem } from '../../../model/order-item.model';

@Component({
  selector: 'app-column-list',
  imports: [CommonModule],
templateUrl: './column-list.component.html',
  styleUrl: './column-list.component.scss'
})
export class ColumnListComponent {

  @Input({ required: true }) title!: string;
  @Input({ required: true }) order: string | undefined;

  typeOrder: WritableSignal<'none' | 'desc' | 'asc'> = signal('none');

  @Output() onChangeEmitter: EventEmitter<OrderItem> = new EventEmitter();

  onClickOrder() {
    this.changeTypeOrder();
    const newOrder = this.buildOrder();
    this.onChangeEmitter.emit(newOrder);
  }

  changeTypeOrder() {

    if (this.typeOrder() === 'none') {
      this.typeOrder.set('asc');
      return;
    }

    if (this.typeOrder() === 'asc') {
      this.typeOrder.set('desc');
      return;
    }

    this.typeOrder.set('none');
  }

  private buildOrder(): OrderItem {
    return {
      field: this.order!,
      order: this.typeOrder()
    }
  }
}
