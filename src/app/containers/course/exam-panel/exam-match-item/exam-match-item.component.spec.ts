import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMatchItemComponent } from './exam-match-item.component';

describe('ExamMatchItemComponent', () => {
  let component: ExamMatchItemComponent;
  let fixture: ComponentFixture<ExamMatchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMatchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
