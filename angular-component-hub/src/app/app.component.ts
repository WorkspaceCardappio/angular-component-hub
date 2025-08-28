import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { ListComponent } from './shared/list/list.component';

@Component({
  selector: 'app-root',
  imports: [ListComponent, CommonModule],
  providers: [
    EntityService,
    HttpClient,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    protected readonly entityService: EntityService<any, any>
  ) {}
}
