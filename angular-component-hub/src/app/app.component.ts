import { Component } from '@angular/core';
import {HeaderComponent} from '../../projects/component-hub/src/lib/header/header.component';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

