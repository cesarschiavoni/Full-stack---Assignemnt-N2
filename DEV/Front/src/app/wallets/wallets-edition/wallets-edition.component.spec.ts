import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsEditionComponent } from './wallets-edition.component';

describe('WalletsEditionComponent', () => {
  let component: WalletsEditionComponent;
  let fixture: ComponentFixture<WalletsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
