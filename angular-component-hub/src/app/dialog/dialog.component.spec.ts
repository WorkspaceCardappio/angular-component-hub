import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {

  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.params = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not exists buttonParams confirm', () => {

    fixture.detectChanges();

    expect(component.params.confirmButtonParams).toEqual({
      background: '#51CF66',
      title: { name: 'Confirmar', color: '#150602'},
      icon: { name: 'fa-regular fa-floppy-disk', color: '#150602' },
      border: { color: '#51CF66' }
    });
  });

  it('not exists buttonParams cancel', () => {

    fixture.detectChanges();

    expect(component.params.cancelButtonParams).toEqual({
      background: '#F5F4F7',
      title: { name: 'Cancelar', color: '#D33B19'},
      icon: { name: 'fa-solid fa-xmark', color: '#D33B19' },
      border: { color: '#D33B19' }
    });
  });

  it('eventCancel', () => {

    const spy = spyOn(component.eventCancel, 'emit');

    component.onClickCancel();

    expect(spy).toHaveBeenCalled();
  });

  it('eventConfirm', () => {

    const spy = spyOn(component.eventConfirm, 'emit');

    component.onClickConfirm();

    expect(spy).toHaveBeenCalled();
  });
});
