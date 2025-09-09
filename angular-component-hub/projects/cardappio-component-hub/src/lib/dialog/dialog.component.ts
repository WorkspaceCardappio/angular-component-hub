import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogParams } from './model/dialog.params';
import {GenericButtonComponent} from '../button/generic/generic.component';

@Component({
  selector: 'cardappio-dialog',
  imports: [GenericButtonComponent, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {

  readonly HIGHLIGHT_COLOR = '#51CF66';
  readonly PRIMARY_COLOR_TEXT = '#150602';

  readonly DANGER_COLOR = '#D33B19';
  readonly BACKGROUND_COLOR = '#F5F4F7';

  @Input({ required: true }) params!: Partial<DialogParams>;

  @Output() eventCancel: EventEmitter<void> = new EventEmitter();
  @Output() eventConfirm: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {

    if (!this.params.confirmButtonParams) {
      this.params.confirmButtonParams = {
        background: this.HIGHLIGHT_COLOR,
        title: { name: 'Confirmar', color: this.PRIMARY_COLOR_TEXT },
        icon: { name: 'fa-regular fa-floppy-disk', color: this.PRIMARY_COLOR_TEXT },
        border: { color: this.HIGHLIGHT_COLOR }
      }
    }

    if (!this.params.cancelButtonParams) {
      this.params.cancelButtonParams = {
        background: this.BACKGROUND_COLOR,
        title: { name: 'Cancelar', color: this.DANGER_COLOR },
        icon: { name: 'fa-solid fa-xmark', color: this.DANGER_COLOR },
        border: { color: this.DANGER_COLOR }
      }
    }

  }

  onClickCancel() {
    this.eventCancel.emit();
  }

  onClickConfirm() {
    this.eventConfirm.emit();
  }
}
