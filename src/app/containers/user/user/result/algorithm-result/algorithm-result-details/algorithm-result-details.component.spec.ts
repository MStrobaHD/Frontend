import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmResultDetailsComponent } from './algorithm-result-details.component';

describe('AlgorithmResultDetailsComponent', () => {
  let component: AlgorithmResultDetailsComponent;
  let fixture: ComponentFixture<AlgorithmResultDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmResultDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
