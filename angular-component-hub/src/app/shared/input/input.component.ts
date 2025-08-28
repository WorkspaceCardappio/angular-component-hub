import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() label: string = 'Label do Input';
  @Input() smallLabel: string = 'Label superior';
  @Input() width: number = 300;
  @Input() height: number = 40;
  @Input() fontSize: number = 16;

  @Input() public value: string = '';

  @Output() public inputValue = new EventEmitter<string>();

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.inputValue.emit(this.value);
  }
}
