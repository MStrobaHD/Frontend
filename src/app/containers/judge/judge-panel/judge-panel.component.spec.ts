import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgePanelComponent } from './judge-panel.component';

describe('JudgePanelComponent', () => {
  let component: JudgePanelComponent;
  let fixture: ComponentFixture<JudgePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
