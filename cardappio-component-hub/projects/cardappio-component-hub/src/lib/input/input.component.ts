import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cardappio-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() fontSize: number = 16;
  @Input() width: number = 15;
  @Input() height: number = 20;
  @Input() type: string = 'text';
  @Input() disabled = false;

  public value: string = '';

  private onChange = (value: any) => {};
  private onTouched = () => {};

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }
}
