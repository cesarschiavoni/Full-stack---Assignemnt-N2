import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWalletsComponent } from './search-wallets.component';

describe('SearchWalletsComponent', () => {
  let component: SearchWalletsComponent;
  let fixture: ComponentFixture<SearchWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWalletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
