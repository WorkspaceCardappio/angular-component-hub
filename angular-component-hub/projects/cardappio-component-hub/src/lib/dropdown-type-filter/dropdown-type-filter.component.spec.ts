import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTypeFilterComponent } from './dropdown-type-filter.component';

describe('DropdownTypeFilterComponent', () => {
  let component: DropdownTypeFilterComponent;
  let fixture: ComponentFixture<DropdownTypeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownTypeFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
