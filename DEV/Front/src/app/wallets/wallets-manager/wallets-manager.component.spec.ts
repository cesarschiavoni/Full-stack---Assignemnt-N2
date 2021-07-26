import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsManagerComponent } from './wallets-manager.component';

describe('WalletsManagerComponent', () => {
  let component: WalletsManagerComponent;
  let fixture: ComponentFixture<WalletsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
