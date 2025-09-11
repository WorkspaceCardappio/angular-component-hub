import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cardappio-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrl: 'checkbox.scss',
  standalone: true,
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent ), } ]
})
export class CheckboxComponent {

  @Input({ required: true }) spanMessage: string = '';
  @Input() defaultChecked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checkedColor: string = '';
}
