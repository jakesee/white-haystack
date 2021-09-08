import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAssistanceSectionComponent } from './need-assistance-section.component';

describe('NeedAssistanceSectionComponent', () => {
  let component: NeedAssistanceSectionComponent;
  let fixture: ComponentFixture<NeedAssistanceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedAssistanceSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAssistanceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
