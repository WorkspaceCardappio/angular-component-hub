import { Component } from '@angular/core';
import { CancelButtonComponent } from './shared/button/cancel/cancel.component';
import { SaveButtonComponent } from "./shared/button/save/save.component";
import { DatePickerComponent } from './shared/date-picker/date-picker.component';

@Component({
  selector: 'app-root',
  imports: [SaveButtonComponent, CancelButtonComponent, DatePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 title = 'angular-component-hub';
  dataPadrao: Date | null = new Date(Date.now());

  onDataAlterada($event: Date | null) {
    console.log('Data :', $event);
  }
}
