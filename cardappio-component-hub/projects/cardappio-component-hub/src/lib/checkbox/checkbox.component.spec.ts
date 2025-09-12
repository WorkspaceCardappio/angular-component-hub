import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('checkbox.component.spec.ts', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  beforeAll(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize defaultChecked as false', () => {

    expect(component.defaultChecked).toBe(false);
  });

  it('should initialize disabled as false', () => {

    expect(component.disabled).toBe(false);
  });

  it('should initialize spanMessage as empty string', () => {

    expect(component.spanMessage).toBe('');
  });

  it('should initialize checkedColor as empty string', () => {

    expect(component.checkedColor).toBe('');
  });
});
