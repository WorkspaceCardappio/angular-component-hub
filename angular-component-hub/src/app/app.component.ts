import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { ListComponent } from './shared/list/list.component';

@Component({
  selector: 'app-root',
  imports: [ListComponent],
  providers: [
    EntityService,
    HttpClient,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-component-hub';

  constructor(
    protected readonly entityService: EntityService<any, any>
  ) {}
}
