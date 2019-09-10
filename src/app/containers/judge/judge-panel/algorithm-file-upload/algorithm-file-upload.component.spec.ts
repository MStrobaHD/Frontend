import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmFileUploadComponent } from './algorithm-file-upload.component';

describe('AlgorithmFileUploadComponent', () => {
  let component: AlgorithmFileUploadComponent;
  let fixture: ComponentFixture<AlgorithmFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
