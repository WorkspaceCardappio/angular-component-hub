import {
  Component, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject, Observable, Subject, of,
} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map, tap, takeUntil, catchError, startWith, shareReplay,
} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true,
  }],
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = 'Buscar...';
  @Input() isMultiple = false;
  @Input() displayField: string | ((item: any) => string) = 'name';
  @Input() displayMultipleField: string | ((item: any) => string) = 'name';
  @Input() search!: (query: string) => Observable<any[]>;
  @Input() itemTemplate!: any;
  @Input() isDisabled = false;
  @Input() topLabelInput = 'Selecione um item';


  @Output() selectionChange = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  searchControl = new FormControl<string>('', { nonNullable: true });

  focused$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);
  options$: Observable<any[]> = of([]);

  selectedItems: any[] = [];
  private _value: any | any[] = null;
  private onChange = (_: any) => {};
  private onTouched = () => {};
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    const query$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(200),
      distinctUntilChanged(),
      map(q => (q ?? '').trim())
    );

    this.options$ = query$.pipe(
      tap(q => this.isLoading$.next(!!q)),
      switchMap(q => {
        if (!q) {
          this.isLoading$.next(false);
          return of([]);
        }
        return this.search(q).pipe(
          map(res => Array.isArray(res) ? res : []),
          tap(() => this.isLoading$.next(false)),
          catchError(() => {
            this.isLoading$.next(false);
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

  //controlvalueaccessor
  writeValue(value: any): void { // n aparee em nehum lugar pq o angular chama
    if (this.isMultiple) {
      this.selectedItems = Array.isArray(value) ? value : [];
      this._value = this.selectedItems;
    } else {
      this.selectedItems = value ? [value] : [];
      this._value = value ?? null;

      const text = this.getDisplayText(value);
      this.searchControl.setValue(text, { emitEvent: false });
    }

  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
    disabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focusIn(): void {
    if (!this.isDisabled) this.focused$.next(true);
  }
  focusOut(): void {
    setTimeout(() => this.focused$.next(false), 160);
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
    if (this.isMultiple) {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
      this._value = this.selectedItems;
    } else {
      this.clearSelection();

    }
    this.onTouched();
    this.onChange(this._value);
    this.selectionChange.emit(this._value);
  }

  clearSelection(): void {
    this.searchControl.enable()
    this.selectedItems = [];
    this._value = this.isMultiple ? [] : null;
    this.searchControl.setValue('', { emitEvent: true });
    this.onTouched();
    this.onChange(this._value);
    this.clear.emit();
  }

  getDisplayText(item: any): string {
    if (!item) {
      return '';
    }
    if (typeof this.displayField === 'function') {
      return this.displayField(item);
    }

    return item[this.displayField] ?? '';
  }

  getDisplayMultipleText(item: any): string {
    if (!item) {
      return '';
    }

    if (typeof this.displayMultipleField === 'function') {
      return this.displayMultipleField(item);
    }

    return item[this.displayMultipleField] ?? '';
  }

}
