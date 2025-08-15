import { Component, Input, OnInit } from '@angular/core';
import { ListParams } from './params/list-params.model';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  @Input({ required: true }) params!: ListParams;

  list: string[] = [];

  ngOnInit(): void {

    for(let i = 0; i < 10; i++) {
      this.list.push(`teste ${i}`);
    }

  }

}
