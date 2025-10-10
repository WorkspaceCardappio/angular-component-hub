import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '../../projects/cardappio-component-hub/src/public-api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  id: any = false;

  categories = (query: string) : Observable<any[]> =>{

    const searchs = [];

    if (query) {
      searchs.push(`name=ilike=${query}%`);
    }

    if (this.id) {
      searchs.push(`id=out=${this.id}`)
    }

    return of([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ]);
  }
}

