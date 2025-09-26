import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardappioListComponent } from '../../projects/cardappio-component-hub/src/public-api';
import { Teste } from './teste';
@Component({
  selector: 'app-root',
  imports: [CardappioListComponent],
  providers: [Teste],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  form: FormGroup<any> = new FormGroup({});

  constructor(
    private readonly builder: FormBuilder,
    protected readonly service: Teste
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: [true]
    });

    this.form.valueChanges.subscribe((value) => console.log(value))
  }

}

