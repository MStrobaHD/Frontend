import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmAddComponent } from './algorithm-add.component';

describe('AlgorithmAddComponent', () => {
  let component: AlgorithmAddComponent;
  let fixture: ComponentFixture<AlgorithmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
