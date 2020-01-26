import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriviligesManagementComponent } from './priviliges-management.component';

describe('PriviligesManagementComponent', () => {
  let component: PriviligesManagementComponent;
  let fixture: ComponentFixture<PriviligesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriviligesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriviligesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
