import { OverlayRef } from '@angular/cdk/overlay';

export class LoaderRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
