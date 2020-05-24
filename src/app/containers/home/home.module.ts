import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TileMenuComponent } from 'src/app/shared/layout/tile-menu/tile-menu.component';
import { TutorialDialogComponent } from './tutorial-dialog/tutorial-dialog';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [LandingPageComponent, TutorialDialogComponent],
  imports: [
    MaterialModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ],
  entryComponents: [TutorialDialogComponent],
})
export class HomeModule {
  constructor(@Optional() @SkipSelf() parentModule: HomeModule) {
    if (parentModule) {
      throw new Error(
        'HomeModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
