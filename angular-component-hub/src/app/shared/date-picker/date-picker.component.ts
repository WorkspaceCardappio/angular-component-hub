import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.component.html',
  providers: [provideNativeDateAdapter(),provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatNativeDateModule],
})
export class DatePickerComponent {

  DEFAULT_SIZE: string = "30";

  @Input() selectedDate: Date | null = new Date()
  @Output() dateChange = new EventEmitter<Date | null>();
  @Input() size: string = this.DEFAULT_SIZE;
  @Input() topLabel: string = "Data";

  onDateChange(event: any) {
    this.dateChange.emit(event.value);
  }

}
