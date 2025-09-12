import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
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
    (component as any).items = signal([{}])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
