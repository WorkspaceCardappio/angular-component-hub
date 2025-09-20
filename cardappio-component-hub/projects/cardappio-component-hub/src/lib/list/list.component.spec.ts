import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardappioListComponent } from './list.component';

describe('ListComponent', () => {
  let component: CardappioListComponent;
  let fixture: ComponentFixture<CardappioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardappioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardappioListComponent);
    component = fixture.componentInstance;
    component.params = { filters: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
