import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

  it('should show "Nenhum resultado encontrado" for no results', waitForAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'xyz';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const noResultsText = fixture.debugElement.query(By.css('.no-results')).nativeElement.textContent;
      expect(noResultsText).toContain('Nenhum resultado encontrado.');
    });
  }));
});
