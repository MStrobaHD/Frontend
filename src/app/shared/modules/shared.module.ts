import { NgModule } from '@angular/core';
import { NavigationComponent } from '../layout/navigation/navigation.component';
import { NavigationBarComponent } from '../layout/navigation/navigation-bar/navigation-bar.component';
import { NavigationSideComponent } from '../layout/navigation/navigation-side/navigation-side.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from '../layout/loading-indicator/loading-indicator.component';
import { ImageOverlayComponent } from '../layout/image-overlay/image-overlay.component';
import { ImagePreviewService } from '../layout/image-preview-overlay/image-preview.service';
import { ImagePreviewOverlayComponent } from '../layout/image-preview-overlay/image-preview-overlay.component';
import { LoaderComponent } from '../layout/loader/loader.component';
import { LoaderService } from '../layout/loader/loader.service';
import { VerdictComponent } from '../layout/verdict-displayer/verdict.component';
import { VerdictService } from '../layout/verdict-displayer/verdict.service';
import { TileMenuComponent } from '../layout/tile-menu/tile-menu.component';
import { ConfirmDialogComponent } from '../layout/confirm-dialog/confirm-dialog';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationBarComponent,
    NavigationSideComponent,
    ImageOverlayComponent,
    ImagePreviewOverlayComponent,
    LoaderComponent,
    VerdictComponent,
    ConfirmDialogComponent,
    TileMenuComponent
  ],
  imports: [
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    NavigationBarComponent,
    NavigationSideComponent,
    ImageOverlayComponent,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    ImagePreviewOverlayComponent,
    LoaderComponent,
    VerdictComponent
  ],
  providers: [ImagePreviewService, LoaderService, VerdictService],
  entryComponents: [
    ImagePreviewOverlayComponent, LoaderComponent, VerdictComponent, ConfirmDialogComponent
  ]
})
export class SharedModule {}
