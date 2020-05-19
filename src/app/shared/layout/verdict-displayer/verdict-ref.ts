import { OverlayRef } from '@angular/cdk/overlay';

export class VerdictRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
