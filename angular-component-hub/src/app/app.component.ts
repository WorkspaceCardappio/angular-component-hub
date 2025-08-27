import {Component} from '@angular/core';
import {CancelButtonComponent} from './shared/button/cancel/cancel.component';
import {SaveButtonComponent} from './shared/button/save/save.component';
import {CheckboxComponent} from './shared/checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  imports: [SaveButtonComponent, CancelButtonComponent, CheckboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-component-hub';
}
