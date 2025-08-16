import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size } from '../../utils/size.model';
import { ButtonParams } from '../params/button-params.model';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericButtonComponent {

  private readonly PRIMARY_COLOR = '#D94D27';
  private readonly SECONDARY_COLOR_TEXT = '#F5F4F7';

  private readonly DEFAULT_PARAMS: ButtonParams = {
    radius: 10,
    size: { width: Size.SMALL, height: 40 },
    title: { name: 'Generic Button', size: '18', color: this.SECONDARY_COLOR_TEXT },
    icon: { name: '', size: '20', color: this.SECONDARY_COLOR_TEXT },
    background: this.PRIMARY_COLOR,
    border: { color: this.PRIMARY_COLOR, size: '1' },
    gap: 10
  };

  finalParams: ButtonParams = this.DEFAULT_PARAMS;

  @Input() set params(value: Partial<ButtonParams>) {
    this.finalParams = this.mergeParams(value);
  }

  @Input() disabled = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  handleClick() {
    if (this.isEnabled()) this.onClick.emit();
  }

  private mergeParams(value: Partial<ButtonParams>): ButtonParams {
    return {
      ...this.DEFAULT_PARAMS,
      ...value,
      size: { ...this.DEFAULT_PARAMS.size, ...(value.size || {}) },
      title: { ...this.DEFAULT_PARAMS.title, ...(value.title || {}) },
      icon: { ...this.DEFAULT_PARAMS.icon, ...(value.icon || {}) },
      border: { ...this.DEFAULT_PARAMS.border, ...(value.border || {}) }
    };
  }

  getButtonStyles(): { [key: string]: string } {

    if (this.disabled) return {};

    return {
      backgroundColor: this.finalParams.background,
      borderRadius: `${this.finalParams.radius}px`,
      minWidth: `${this.finalParams.size.width}px`,
      height: `${this.finalParams.size.height}px`,
      border: `${this.finalParams.border.size}px solid ${this.finalParams.border.color}`,
      color: this.finalParams.title.color!,
      gap: `${this.finalParams.gap}px`,
    };
  }

  getIconStyles(): { [key: string]: string } {
    return {
      fontSize: `${this.finalParams.icon.size}px`,
      color: this.disabled ? '#999' : this.finalParams.icon.color!,
    };
  }

  private isEnabled() {
    return !this.disabled;
  }

}
