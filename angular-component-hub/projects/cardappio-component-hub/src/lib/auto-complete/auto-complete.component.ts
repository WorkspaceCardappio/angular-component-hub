import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, signal,
} from '@angular/core';
import {
  FormControl, ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Observable, Subject, of,
} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map, tap, catchError, startWith, shareReplay,
} from 'rxjs/operators';

@Component({
  selector: 'carddapio-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Buscar...';
  @Input() isMultiple = false;
  @Input() displayField: (item: any) => string = (item: any) => item.name;
  @Input() displayMultipleField: (item: any) => string = (item: any) => item.name;
  @Input({ required: true }) search!: (query: string) => Observable<any[]>;
  @Input() isDisabled = false;
  @Input() topLabelInput = 'Selecione um item';
  @Input() size: number = 20;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  searchControl = new FormControl<string>('', { nonNullable: true });

  focused = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  options$: Observable<any[]> = of([]);

  selectedItems: any[] = [];
  private _value: any | any[] = null;
  private onChange = (_: any) => {};
  private onTouched = () => {};
  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    if (this.isDisabled) {
      this.searchControl.disable();
    }

    const query$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(200),
      distinctUntilChanged(),
      map(searchQuery => (searchQuery ?? '').trim())
    );

    this.options$ = query$.pipe(

      tap(q => this.isLoading.set(!!q)),
      switchMap(q => {
        if (!q) {
          this.isLoading.set(false);
          return of([]);
        }
        return this.search(q).pipe(
          map(res => Array.isArray(res) ? res : []),

          tap(() => this.isLoading.set(false)),
          catchError(() => {
            this.isLoading.set(false);
            return of([]);
          })
        );
      }),
      shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  focusIn(): void {
    if (!this.isDisabled) this.focused.set(true);
  }

  focusOut(): void {
    setTimeout(() => this.focused.set(false), 160);
  }

  onOptionSelected(item: any): void {
    if (this.isMultiple) {
      if (!this.selectedItems.some(i => (i?.id ?? i) === (item?.id ?? item))) {
        this.selectedItems = [...this.selectedItems, item];
      }
      this._value = this.selectedItems;
      this.searchControl.setValue('', { emitEvent: true });
    } else {
      this.selectedItems = [item];
      this._value = item;

      this.searchControl.setValue(this.getDisplayText(item), { emitEvent: false });
      this.searchControl.disable()
    }

    this.onTouched();
    this.onChange(this._value);
    this.selectionChange.emit(this._value);
  }

  removeItem(item: any, event?: MouseEvent): void {
    event?.stopPropagation();
    this.selectedItems = this.selectedItems.filter(i => i !== item);

    this.onTouched();
    this.onChange(this._value);
    this.selectionChange.emit(this._value);
  }

  clearSelection(): void {
    this._resetState();
    this.onTouched();
    this.onChange(this._value);
    this.clear.emit();
  }

  private _resetState(): void {
    this.searchControl.enable();
    this.selectedItems = [];
    this._value = this.isMultiple ? [] : null;
    this.searchControl.setValue('', { emitEvent: true });
  }

  getDisplayText(item: any): string {
    if (!item) {
      return '';
    }

    return this.displayField(item);

  }

  getDisplayMultipleText(item: any): string {

    return this.displayMultipleField(item);

  }
}
