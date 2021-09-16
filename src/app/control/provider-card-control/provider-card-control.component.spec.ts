import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCardControlComponent } from './provider-card-control.component';

describe('ProviderCardControlComponent', () => {
  let component: ProviderCardControlComponent;
  let fixture: ComponentFixture<ProviderCardControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderCardControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCardControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
