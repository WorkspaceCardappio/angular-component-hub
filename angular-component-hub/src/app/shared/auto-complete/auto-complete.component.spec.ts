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

  it('should update ngModel when an option is selected (single)', waitForAsync(() => {
    component.isMultiple = false;
    component.writeValue(null);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'Maria';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const optionEl = fixture.debugElement.query(By.css('.autocomplete-dropdown li')).nativeElement;
      optionEl.dispatchEvent(new Event('mousedown'));
      fixture.detectChanges();

      expect(component.selectedItems[0]).toEqual(MOCK_USERS[1]);
    });
  }));

  it('should add selected items to ngModel when multiple options are selected', waitForAsync(() => {
    component.isMultiple = true;
    component.writeValue([]);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'J';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const optionEl = fixture.debugElement.query(By.css('.autocomplete-dropdown li')).nativeElement;
      optionEl.dispatchEvent(new Event('mousedown'));
      fixture.detectChanges();

      expect(component.selectedItems.length).toBe(1);

      inputEl.value = 'M';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const optionEl2 = fixture.debugElement.query(By.css('.autocomplete-dropdown li')).nativeElement;
        optionEl2.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();

        expect(component.selectedItems.length).toBe(2);
        expect(component.selectedItems).toEqual([MOCK_USERS[0], MOCK_USERS[1]]);
      });
    });
  }));

  it('should remove a chip from the selected items (multiple)', () => {
    component.isMultiple = true;
    component.writeValue([MOCK_USERS[0], MOCK_USERS[1]]);
    fixture.detectChanges();

    const chipRemoveButton = fixture.debugElement.query(By.css('.chip-remove')).nativeElement;
    chipRemoveButton.click();
    fixture.detectChanges();

    expect(component.selectedItems.length).toBe(1);
    expect(component.selectedItems).toEqual([MOCK_USERS[1]]);
  });

  it('should clear selection when the clear button is clicked (single)', () => {
    component.isMultiple = false;
    component.writeValue(MOCK_USERS[0]);
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.clear-button')).nativeElement;
    clearButton.click();
    fixture.detectChanges();

    expect(component.selectedItems.length).toBe(0);
  });

  it('should call the search function with the correct query', waitForAsync(() => {
    const searchSpy = spyOn(component, 'search').and.callThrough();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'Maria';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(searchSpy).toHaveBeenCalledWith('Maria');
    });
  }));

  it('should show the loading state and then hide it', waitForAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'Joao';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isLoading$.value).toBe(true);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.isLoading$.value).toBe(false);
    });
  }));

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
