import { Component } from '@angular/core';
import { CancelButtonComponent } from './shared/button/cancel/cancel.component';
import { SaveButtonComponent } from "./shared/button/save/save.component";
import { InputComponent } from './shared/input/input.component';

@Component({
  selector: 'app-root',
  imports: [InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 title = 'angular-component-hub';
  nomeDigitado: string = '';

  onNomeChange(novoValor: string): void {
    this.nomeDigitado = novoValor;
    console.log('Valor atual:', this.nomeDigitado);
  }
}
