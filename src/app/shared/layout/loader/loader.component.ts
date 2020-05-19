import { Component, Inject } from '@angular/core';
import { LoaderRef } from './loader-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './loader.tokens';

@Component({
  selector: 'loader',
  template: `
    <div class="overlay-content">
      <img src="../../../../assets/loading.gif">
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
export class LoaderComponent {

  constructor(
    public dialogRef: LoaderRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public loadingGif: any) { }
}
