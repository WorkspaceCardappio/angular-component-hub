import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortItem } from '../../../model/order-item.model';
import { ColumnListComponent } from './column-list.component';

describe('ColumnListComponent', () => {
  let component: ColumnListComponent;
  let fixture: ComponentFixture<ColumnListComponent>;

  const buildSort = (field: string, value: 'none' | 'asc' | 'desc'): SortItem => {
    return {
      field: field,
      order: value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClickSort', () => {

    component.order = 'teste.id';

    const spy = spyOn(component.onChangeEmitter, 'emit');
    expect(component.typeSort()).toEqual('none');

    component.onClickSort();
    expect(component.typeSort()).toEqual('asc');
    expect(spy).toHaveBeenCalledWith(buildSort('teste.id', 'asc'));

    component.onClickSort();
    expect(component.typeSort()).toEqual('desc');
    expect(spy).toHaveBeenCalledWith(buildSort('teste.id', 'desc'));

    component.onClickSort();
    expect(component.typeSort()).toEqual('none');
    expect(spy).toHaveBeenCalledWith(buildSort('teste.id', 'none'));

  });
});
