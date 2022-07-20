import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidresponsesComponent } from './view-bidresponses.component';

describe('ViewBidresponsesComponent', () => {
  let component: ViewBidresponsesComponent;
  let fixture: ComponentFixture<ViewBidresponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBidresponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBidresponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
