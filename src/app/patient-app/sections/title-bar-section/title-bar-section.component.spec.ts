import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarSectionComponent } from './title-bar-section.component';

describe('TitleBarSectionComponent', () => {
  let component: TitleBarSectionComponent;
  let fixture: ComponentFixture<TitleBarSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleBarSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
