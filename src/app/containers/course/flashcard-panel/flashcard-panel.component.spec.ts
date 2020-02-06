import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPanelComponent } from './flashcard-panel.component';

describe('FlashcardPanelComponent', () => {
  let component: FlashcardPanelComponent;
  let fixture: ComponentFixture<FlashcardPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
