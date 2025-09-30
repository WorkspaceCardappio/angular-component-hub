import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Router } from '@angular/router';

@Component({
  selector: 'cardappio-left-menu',
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: './left-menu.component.html',
  standalone: true,
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  @Input({ required: true }) routes: any;

  expanded = false;

  constructor(
    private readonly router: Router
  ) {}

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
