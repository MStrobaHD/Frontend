import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmResultComponent } from './algorithm-result.component';

describe('AlgorithmResultComponent', () => {
  let component: AlgorithmResultComponent;
  let fixture: ComponentFixture<AlgorithmResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
