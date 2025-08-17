import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActionItem } from '../../model/action-item.model';

@Component({
  selector: 'app-actions-list',
  imports: [],
  template: `
    <span>

      @for (item of actions; track $index) {
        @if (item.enabled) {
          <i [class]="item.icon.name" (click)="item.action(id)" [style.color]="item.icon.color" style="font-size: 14px;"></i>
        }
      }

    </span>
  `,
  styles: `
    span {
      display: flex;
      gap: 10px;

      i {
        cursor: pointer;
      }
    }
  `
})
export class ActionsListComponent {

  readonly showEdicao = true;
  readonly showDelecao = true;

  @Input({ required: true }) nameRoute!: string;
  @Input({ required: true }) id!: number;

  // TODO: melhorar nome
  @Input() actionsInput: ActionItem[] | undefined;

  constructor(
    private readonly router: Router
  ) {}

  // TODO: Precisa abrir um dialog para confirmar deleção

  get actions(): ActionItem[] {
    return [...this.actionsInput || [], ...this._DEFAULT_ACTIONS];
  }

  get _DEFAULT_ACTIONS(): ActionItem[] {
    return [
      {
        name: 'edição',
        icon: { name: 'fa-solid fa-pencil', color: '#015EAF' },
        action: (id?: number) => this.router.navigate([`${this.nameRoute}/${id}`]),
        enabled: this.showEdicao
      },
      {
        name: 'Delete',
        icon: { name: 'fa-solid fa-trash-can', color: '#D33B19' },
        action: (id?: number) => this.router.navigate([`${this.nameRoute}/${id}`]),
        enabled: this.showDelecao
      }
    ];
  }
}
