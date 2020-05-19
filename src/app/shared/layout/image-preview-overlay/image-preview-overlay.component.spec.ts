import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewOverlayComponent } from './image-preview-overlay.component';

describe('ImagePreviewOverlayComponent', () => {
  let component: ImagePreviewOverlayComponent;
  let fixture: ComponentFixture<ImagePreviewOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
