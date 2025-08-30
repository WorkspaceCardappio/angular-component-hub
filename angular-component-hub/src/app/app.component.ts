import { Component } from '@angular/core';
import { LeftMenuComponent } from "./shared/left-menu/left-menu.component";

@Component({
  selector: 'app-root',
  imports: [LeftMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-component-hub';
}
