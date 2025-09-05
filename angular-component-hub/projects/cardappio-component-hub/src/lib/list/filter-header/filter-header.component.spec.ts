import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeaderComponent } from './filter-header.component';

describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;

  const buildItem = (title: string, value: string) => {
    return {
      title: title,
      value: value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClick', () => {

    const spy = spyOn(component.newFilter, 'emit');

    component.fieldFilter = buildItem('Darth Vader', 'darth.vader');
    component.typeFilter = buildItem('Igual', '==');
    (component as any).search.setValue('anakin');

    component.onClick();

    expect(spy).toHaveBeenCalledWith({
      field: 'darth.vader',
      fieldTitle: 'Darth Vader',
      condition: '==',
      conditionTitle: 'Igual',
      value: 'anakin'
    });

    expect((component as any).search.value).toBe('');
  });
});
