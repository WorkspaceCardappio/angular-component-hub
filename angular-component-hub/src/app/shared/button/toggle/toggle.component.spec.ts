import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { FormsModule } from '@angular/forms';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToggleComponent, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.label).toBe('');
    expect(component.value).toBe(false);
  });

  it('should toggle value when checkbox is clicked', () => {
    fixture.detectChanges();
    const checkbox = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(component.value).toBe(false);
    checkbox.click();

    fixture.detectChanges();
    expect(component.value).toBe(true);

  });

  it('should emit onSwitch event when value changes', () => {
    spyOn(component.onSwitch, 'emit');
    fixture.detectChanges();

    const checkbox = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();

    expect(component.onSwitch.emit).toHaveBeenCalledWith(true);
  });
});