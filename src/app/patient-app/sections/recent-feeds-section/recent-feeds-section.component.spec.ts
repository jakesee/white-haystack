import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentFeedsSectionComponent } from './recent-feeds-section.component';

describe('RecentFeedsSectionComponent', () => {
  let component: RecentFeedsSectionComponent;
  let fixture: ComponentFixture<RecentFeedsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentFeedsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentFeedsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
