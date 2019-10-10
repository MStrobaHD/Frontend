import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDragDropComponent } from './exam-drag-drop.component';

describe('ExamDragDropComponent', () => {
  let component: ExamDragDropComponent;
  let fixture: ComponentFixture<ExamDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
