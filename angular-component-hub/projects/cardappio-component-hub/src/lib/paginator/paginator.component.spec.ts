import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import {Page} from '../model/page.model';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.pageable = { number: 1 } as Page<any>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
