import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFilterComponent } from './active-filter.component';

describe('ActiveFilterComponent', () => {
  let component: ActiveFilterComponent;
  let fixture: ComponentFixture<ActiveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on Remove', () => {
    const spy = spyOn(component.onRemove, 'emit');

    component.removeByIndex(12);

    expect(spy).toHaveBeenCalledWith(12);
  });

  it('on Remove all', () => {
    const spy = spyOn(component.onRemoveAll, 'emit');

    component.removeAll();

    expect(spy).toHaveBeenCalledWith();
  });
});
