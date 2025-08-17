import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Pageable } from '../../model/pageable.model';
import { PageSizeComponent } from "../page-size/page-size.component";
import { PaginatorComponent } from '../paginator/paginator.component';
import { ListParams } from './params/list-params.model';

@Component({
  selector: 'app-list',
  imports: [CommonModule, PaginatorComponent, PageSizeComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  @Input({ required: true }) params!: ListParams;
  @Input() quantityPages: number[] = [20, 5, 10, 50, 100];

  responseData: Pageable = { content: [], empty: false, first: true, last: true, number: 0, totalPages: 30 } as any;

  ngOnInit(): void {

    for(let i = 0; i < 10; i++) {
      this.responseData.content.push(`teste ${i}`);
    }

  }

  detectChangePageSize(value: number) {
    console.log('Mudou size fazer o findAll Com tamanho diferente:' + value);
  }

}
