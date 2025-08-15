import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericButtonComponent } from '../generic/generic.component';

@Component({
  selector: 'app-cancel-button',
  imports: [GenericButtonComponent],
  template: `
    <app-generic-button
      [params]="{
        background: BACKGROUND_COLOR,
        title: { name: 'Cancelar', color: DANGER_COLOR },
        icon: { name: 'fa-solid fa-xmark', color: DANGER_COLOR },
        border: { color: DANGER_COLOR }
      }"
      [disabled]="disabled"
      (onClick)="onClick.emit()"
    ></app-generic-button>
  `
})
export class CancelButtonComponent {

  readonly DANGER_COLOR = '#D33B19';
  readonly BACKGROUND_COLOR = '#F5F4F7';

  @Input() disabled = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

}

