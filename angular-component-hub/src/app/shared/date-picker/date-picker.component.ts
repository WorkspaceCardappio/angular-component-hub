import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatNativeDateModule],
})
export class DatePickerComponent {

  DEFAULT_SIZE: string = "30";

  @Input() selectedDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date | null>();
  @Input() size: string = this.DEFAULT_SIZE;

  onDateChange(event: any) {
    this.dateChange.emit(event.value);
  }

}
