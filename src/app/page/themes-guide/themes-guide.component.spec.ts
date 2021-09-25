import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesGuideComponent } from './themes-guide.component';

describe('ThemesGuideComponent', () => {
  let component: ThemesGuideComponent;
  let fixture: ComponentFixture<ThemesGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
