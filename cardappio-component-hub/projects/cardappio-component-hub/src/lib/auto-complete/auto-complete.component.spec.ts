import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AutocompleteComponent } from './auto-complete.component';

const MOCK_USERS = [
  { id: 1, name: 'João Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
  { id: 3, name: 'Carlos Souza', email: 'carlos@example.com' },
];

const mockSearch = (query: string): Observable<any[]> => {
  if (!query) {
    return of(MOCK_USERS);
  }
  const lowerQuery = query.toLowerCase();
  return of(MOCK_USERS.filter(user => user.name.toLowerCase().includes(lowerQuery)));
};

describe('AutocompleteComponent', () => {
  let fixture: ComponentFixture<AutocompleteComponent>;
  let component: AutocompleteComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, AutocompleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.search = mockSearch;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Nenhum resultado encontrado" for no results', fakeAsync(() => {
    component.focusIn();
    fixture.detectChanges();

    component.searchControl.setValue('xyz');
    tick(200);
    fixture.detectChanges();

    const noResultsEl = fixture.debugElement.query(By.css('.no-results'));
    expect(noResultsEl).toBeTruthy();
    expect(noResultsEl.nativeElement.textContent).toContain('Nenhum resultado encontrado.');
  }));

  it('should load search values before user digit', waitForAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      component.options$.subscribe(options => {
        expect(options.length).toBe(3);
        expect(options).toEqual(MOCK_USERS);
      });
    });
  }))
});
