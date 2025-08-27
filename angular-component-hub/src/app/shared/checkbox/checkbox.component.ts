import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrl: 'checkbox.scss',
  standalone: true,
})
export class CheckboxComponent {

  @Input({ required: true }) spanMessage: string = '';
  @Input() defaultChecked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checkedColor: string = '';
}
