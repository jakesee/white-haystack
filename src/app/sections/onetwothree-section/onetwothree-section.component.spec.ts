import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetwothreeSectionComponent } from './onetwothree-section.component';

describe('OnetwothreeSectionComponent', () => {
  let component: OnetwothreeSectionComponent;
  let fixture: ComponentFixture<OnetwothreeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnetwothreeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetwothreeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
