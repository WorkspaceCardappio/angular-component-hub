import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeComponent } from './page-size.component';

describe('PageSizeComponent', () => {
  let component: PageSizeComponent;
  let fixture: ComponentFixture<PageSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeComponent);
    component = fixture.componentInstance;
    component.quantityPages = [20];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
