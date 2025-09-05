import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'cardappio-page-size',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [value]="selectedPageSize()" (change)="onChangePageSize($event)">
      @for (quantity of quantityPages; track quantity) {
        <option [value]="quantity">{{ quantity }}</option>
      }
    </select>
  `,
  styles: `
    select {
      padding: 5px 10px;
      background: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }
  `
})
export class PageSizeComponent implements OnInit {

  @Input({ required: true }) quantityPages!: number[];

  @Output() onChange: EventEmitter<number> = new EventEmitter();

  readonly selectedPageSize = signal(20);

  ngOnInit(): void {
    this.selectedPageSize.set(this.quantityPages[0]);
  }

  onChangePageSize(event: Event) {

    const value = (event.target as HTMLSelectElement).value;
    if (!value) return;

    this.selectedPageSize.set(parseInt(value));
    this.onChange.emit(this.selectedPageSize());
  }

}
