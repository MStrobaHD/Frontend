import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamWriteAnswerComponent } from './exam-write-answer.component';

describe('ExamWriteAnswerComponent', () => {
  let component: ExamWriteAnswerComponent;
  let fixture: ComponentFixture<ExamWriteAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamWriteAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamWriteAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
