import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './upload/dialog/dialog.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadService } from './upload.service';
import { UploadCustomComponent } from './upload/upload-custom.component';

@NgModule({
  declarations: [UploadCustomComponent, DialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  exports: [UploadCustomComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService]
})
export class UploadModule {}
