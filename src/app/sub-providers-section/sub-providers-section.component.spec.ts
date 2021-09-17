import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProvidersSectionComponent } from './sub-providers-section.component';

describe('SubProvidersSectionComponent', () => {
  let component: SubProvidersSectionComponent;
  let fixture: ComponentFixture<SubProvidersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProvidersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProvidersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
