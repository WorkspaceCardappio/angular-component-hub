import {
  Component, OnInit, Input, Output, EventEmitter, forwardRef, OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject, Observable, Subject, of,
} from 'rxjs'; // Removido 'combineLatest'
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
  @Input() displayField = 'name';
  @Input() searchService!: (query: string) => Observable<any[]>;
  @Input() itemTemplate!: any;
  @Input() isDisabled = false;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  searchControl = new FormControl<string>('', { nonNullable: true });

  // A visibilidade do dropdown será controlada diretamente por este Subject no template
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
        return this.searchService(q).pipe(
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

    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.onTouched());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    if (this.isMultiple) {
      this.selectedItems = Array.isArray(value) ? value : [];
      this._value = this.selectedItems;
    } else {
      this.selectedItems = value ? [value] : [];
      this._value = value ?? null;
      const text = value ? (value?.[this.displayField] ?? '') : '';
      this.searchControl.setValue(text, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
    disabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  // Foco / abertura
  focusIn(): void {
    if (!this.isDisabled) this.focused$.next(true);
  }
  focusOut(): void {
    // Pequeno delay para permitir o clique em um item antes de fechar o dropdown
    setTimeout(() => this.focused$.next(false), 160);
  }

  // Seleção
  onOptionSelected(item: any): void {
    if (this.isMultiple) {
      if (!this.selectedItems.some(i => (i?.id ?? i) === (item?.id ?? item))) {
        this.selectedItems = [...this.selectedItems, item];
      }
      this._value = this.selectedItems;
      this.searchControl.setValue('', { emitEvent: true }); // Continua pesquisando
    } else {
      this.selectedItems = [item];
      this._value = item;
      this.searchControl.setValue(item?.[this.displayField] ?? '', { emitEvent: false });
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
    this.selectedItems = [];
    this._value = this.isMultiple ? [] : null;
    this.searchControl.setValue('', { emitEvent: true });
    this.onTouched();
    this.onChange(this._value);
    this.clear.emit();
  }
}
