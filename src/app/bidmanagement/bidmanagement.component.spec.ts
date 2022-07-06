import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidmanagementComponent } from './bidmanagement.component';

describe('BidmanagementComponent', () => {
  let component: BidmanagementComponent;
  let fixture: ComponentFixture<BidmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
