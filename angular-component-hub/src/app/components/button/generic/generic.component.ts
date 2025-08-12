import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonParams } from '../params/button-params.model';

@Component({
  selector: 'app-generic-button',
  imports: [CommonModule],
  templateUrl: './generic.component.html'
})
export class GenericButtonComponent {

  private readonly DEFAULT_PARAMS: ButtonParams = {
    radius: 10,
    size: {
      width: 100,
      height: 40
    },
    title: {
      name: 'Generic Button',
      size: '18',
      color: '#F5F4F7'
    },
    icon: {
      name: 'fa-regular fa-house',
      size: '20',
      color: '#F5F4F7'
    },
    outlined: false,
    background: '#D94D27',
    border: {
      color: '#D94D27',
      size: '1'
    },
    gap: 10
  };

  @Input() params: ButtonParams = this.DEFAULT_PARAMS;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  get buttonStyle() {
    return {
      backgroundColor: this.params.background,
      borderRadius: `${this.params.radius}px`,
      minWidth: `${this.params.size.width}px`,
      height: `${this.params.size.height}px`,
      border: `${this.params.border.size}px solid ${this.params.border.color}`,
      color: this.params.title.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: `${this.params.gap}px`,
      padding: '10px 20px',
      cursor: 'pointer'
    };
  }

}
