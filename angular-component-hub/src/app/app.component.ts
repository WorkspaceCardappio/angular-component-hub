import { Component } from '@angular/core';
import { CancelButtonComponent } from './shared/button/cancel/cancel.component';
import { SaveButtonComponent } from "./shared/button/save/save.component";
import { ToggleComponent } from "./shared/button/toggle/toggle.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [SaveButtonComponent, CancelButtonComponent, ToggleComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 title = 'angular-component-hub';

  value = true;

  onToggleChanged(value: boolean) {
    this.value = value;
    console.log('Toggle mudou para:', value);
  }
}

