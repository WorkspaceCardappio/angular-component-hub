import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() onSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _value: boolean = false;
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  public get value(): boolean {
    return this._value;
  }

  set value(val: boolean) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(this._value);
      this.onTouched();
    }
  }

  writeValue(value: boolean): void {
    this.value = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
