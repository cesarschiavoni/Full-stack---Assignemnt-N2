import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriciEditionComponent } from './prici-edition.component';

describe('PriciEditionComponent', () => {
  let component: PriciEditionComponent;
  let fixture: ComponentFixture<PriciEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriciEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriciEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
