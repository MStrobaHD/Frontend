import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnlistedComponent } from './course-enlisted.component';

describe('CourseEnlistedComponent', () => {
  let component: CourseEnlistedComponent;
  let fixture: ComponentFixture<CourseEnlistedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEnlistedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnlistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
