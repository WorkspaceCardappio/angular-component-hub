import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsListComponent } from './actions-list.component';
import { of } from 'rxjs';

describe('actions-list-component.spec.ts', () => {
  let component: ActionsListComponent;
  let fixture: ComponentFixture<ActionsListComponent>;
  let serviceMock: any

  beforeEach(() => {

    serviceMock = jasmine.createSpyObj('EntityService', ['delete', 'save']);
    serviceMock.delete.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      imports: [ActionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsListComponent);
    component = fixture.componentInstance;

    component.service = serviceMock;

    fixture.detectChanges();
  });

  it('should emit event on delete and close dialog', () => {

    const spy = spyOn(component.onDelete, 'emit');

    (component as any).showDialogDelete = true;

    component.confirmDelete();

    expect((component as any).showDialogDelete).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });
});
