import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsSectionComponent } from './symptoms-section.component';

describe('SymptomsSectionComponent', () => {
  let component: SymptomsSectionComponent;
  let fixture: ComponentFixture<SymptomsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
