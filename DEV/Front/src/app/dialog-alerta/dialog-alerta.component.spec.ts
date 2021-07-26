import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertaComponent } from './dialog-alerta.component';

describe('DialogAlertaComponent', () => {
  let component: DialogAlertaComponent;
  let fixture: ComponentFixture<DialogAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
