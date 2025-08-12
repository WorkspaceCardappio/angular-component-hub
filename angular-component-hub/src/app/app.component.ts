import { Component } from '@angular/core';
import { GenericButtonComponent } from './components/button/generic/generic.component';

@Component({
  selector: 'app-root',
  imports: [GenericButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-component-hub';
}
