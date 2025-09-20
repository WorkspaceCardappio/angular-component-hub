import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from '../../projects/cardappio-component-hub/src/public-api';
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, ToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  form: FormGroup<any> = new FormGroup({});

  constructor(
    private readonly builder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: [true]
    });

    this.form.valueChanges.subscribe((value) => console.log(value))
  }

}

