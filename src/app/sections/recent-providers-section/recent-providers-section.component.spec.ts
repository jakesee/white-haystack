import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProvidersSectionComponent } from './recent-providers-section.component';

describe('RecentProvidersSectionComponent', () => {
  let component: RecentProvidersSectionComponent;
  let fixture: ComponentFixture<RecentProvidersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentProvidersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentProvidersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
