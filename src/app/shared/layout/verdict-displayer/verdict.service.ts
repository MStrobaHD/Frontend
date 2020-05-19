import { Injectable, Inject, OnInit, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { VerdictRef } from './verdict-ref';
import { VerdictComponent } from './verdict.component';
import { VERDICT_DATA } from './verdict.tokens';



interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  image?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
  image: null
}

@Injectable()
export class VerdictService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

  open(config: FilePreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new VerdictRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: VerdictRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(VerdictComponent, null, injector);
    const containerRef: ComponentRef<VerdictComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: FilePreviewDialogConfig, dialogRef: VerdictRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(VerdictRef, dialogRef);
    injectionTokens.set(VERDICT_DATA, config.image);
    console.log(config.image);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}