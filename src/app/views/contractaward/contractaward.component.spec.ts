import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractawardComponent } from './contractaward.component';

describe('ContractawardComponent', () => {
  let component: ContractawardComponent;
  let fixture: ComponentFixture<ContractawardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractawardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractawardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
