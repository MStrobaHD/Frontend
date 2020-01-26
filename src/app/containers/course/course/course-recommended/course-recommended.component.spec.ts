import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRecommendedComponent } from './course-recommended.component';

describe('CourseRecommendedComponent', () => {
  let component: CourseRecommendedComponent;
  let fixture: ComponentFixture<CourseRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
