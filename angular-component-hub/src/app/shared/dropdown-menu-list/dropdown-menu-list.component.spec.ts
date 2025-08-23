import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuListComponent } from './dropdown-menu-list.component';

describe('DropdownMenuListComponent', () => {
  let component: DropdownMenuListComponent;
  let fixture: ComponentFixture<DropdownMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
