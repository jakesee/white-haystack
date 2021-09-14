import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareNetworkComponent } from './care-network.component';

describe('CareNetworkComponent', () => {
  let component: CareNetworkComponent;
  let fixture: ComponentFixture<CareNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
