import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericButtonComponent } from '../generic/generic.component';

@Component({
  selector: 'cardappio-save-button',
  imports: [GenericButtonComponent],
  template: `
    <cardappio-generic-button
      [params]="{
        background: HIGHLIGHT_COLOR,
        title: { name: 'Salvar', color: PRIMARY_COLOR_TEXT },
        icon: { name: 'fa-regular fa-floppy-disk', color: PRIMARY_COLOR_TEXT },
        border: { color: HIGHLIGHT_COLOR }
      }"
      [disabled]="disabled"
      (onClick)="onClick.emit()"
    ></cardappio-generic-button>
  `
})
export class SaveButtonComponent {

  readonly HIGHLIGHT_COLOR = '#51CF66';
  readonly PRIMARY_COLOR_TEXT = '#150602';

  @Input() disabled = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

}
