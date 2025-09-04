import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  imports: [CommonModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  // TODO: Discutir para definir com base em um arquivo as rotas

  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
