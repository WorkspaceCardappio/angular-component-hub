import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = 'Label do Input';
  @Input() label: string = 'Label superior';
  width: number = 50;
  height: number = 3;
  @Input() fontSize: number = 16;
  @Input() public value: string = '';

  @Output() public inputValue = new EventEmitter<string>();

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.inputValue.emit(this.value);
  }
}
