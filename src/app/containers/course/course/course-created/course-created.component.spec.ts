import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreatedComponent } from './course-created.component';

describe('CourseCreatedComponent', () => {
  let component: CourseCreatedComponent;
  let fixture: ComponentFixture<CourseCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
