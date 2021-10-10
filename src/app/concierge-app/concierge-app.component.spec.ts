import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergeAppComponent } from './concierge-app.component';

describe('ConciergeAppComponent', () => {
  let component: ConciergeAppComponent;
  let fixture: ComponentFixture<ConciergeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciergeAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciergeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
