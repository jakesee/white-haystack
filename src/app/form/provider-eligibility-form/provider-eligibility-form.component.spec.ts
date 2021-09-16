import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEligibilityFormComponent } from './provider-eligibility-form.component';

describe('ProviderEligibilityFormComponent', () => {
  let component: ProviderEligibilityFormComponent;
  let fixture: ComponentFixture<ProviderEligibilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderEligibilityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderEligibilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
