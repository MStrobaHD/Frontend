import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardStudyingComponent } from './flashcard-studying.component';

describe('FlashcardStudyingComponent', () => {
  let component: FlashcardStudyingComponent;
  let fixture: ComponentFixture<FlashcardStudyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardStudyingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardStudyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
