import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
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
export class ToggleComponent implements ControlValueAccessor{

@Input() label: string = '';

@Input() disabled: boolean = false;

@Input() size: 'small' | 'medium' | 'large' = 'medium';

@Output() onSwitch: EventEmitter<any> = new EventEmitter<any>();

private _value: boolean = false;

private onChange = (value: any) => {};
private onTouched = () => {};

public get value(): boolean {
  return this._value;
}

public set value(val: boolean) {
  if (val !== this._value) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.onSwitch.emit(this._value);
  }
}

writeValue(value: any): void {
  this._value = value;
  this.onChange(this._value);
}

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched = fn;
}

setDisabledState?(isDisabled: boolean): void {
  this.disabled = isDisabled;
}

}
