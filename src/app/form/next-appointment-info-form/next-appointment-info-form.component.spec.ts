import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextAppointmentInfoFormComponent } from './next-appointment-info-form.component';

describe('NextAppointmentInfoFormComponent', () => {
  let component: NextAppointmentInfoFormComponent;
  let fixture: ComponentFixture<NextAppointmentInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextAppointmentInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextAppointmentInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
