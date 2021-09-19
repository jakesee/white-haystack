import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCardControlComponent } from './appointment-card-control.component';

describe('AppointmentCardControlComponent', () => {
  let component: AppointmentCardControlComponent;
  let fixture: ComponentFixture<AppointmentCardControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCardControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCardControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
