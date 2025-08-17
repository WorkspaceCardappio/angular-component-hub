import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Pageable } from '../../model/pageable.model';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ListParams } from './params/list-params.model';

@Component({
  selector: 'app-list',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  @Input({ required: true }) params!: ListParams;

  responseData: Pageable = { content: [], empty: false, first: true, last: true, number: 0, totalPages: 30 } as any;

  ngOnInit(): void {

    for(let i = 0; i < 10; i++) {
      this.responseData.content.push(`teste ${i}`);
    }

  }

}
