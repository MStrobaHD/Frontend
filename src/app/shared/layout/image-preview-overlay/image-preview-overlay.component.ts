import { Component, Inject } from '@angular/core';

import { ImagePreviewOverlayRef } from './image-preview-ref';

import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

@Component({
  selector: 'image-preview-overlay',
  template: `
    <div class="overlay-content">
      <h1 *ngIf="image.badgeName !== 'null'" >Otrzymałeś odznakę {{image.badgeName}}</h1>
      <img [src]="image.imageUrl">
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      align-items: center;
      color: white;
      font-size: 1.8rem;
      font-family: "Raleway", sans-serif;
    }

    img {
      width: 20rem;
      max-width: 20rem;
      height: auto;
    }

    .overlay-content {
      padding: 1em;
    }
  `]
})
export class ImagePreviewOverlayComponent {

  constructor(
    public dialogRef: ImagePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public image: any) { }
}
