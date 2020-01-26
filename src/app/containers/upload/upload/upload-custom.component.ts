import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadService } from '../upload.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-upload-custom',
  templateUrl: './upload-custom.component.html',
  styleUrls: ['./upload-custom.component.scss']
})
export class UploadCustomComponent  {
  @Input()
  Id: string;
  constructor(public dialog: MatDialog, public uploadService: UploadService) { }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%', data: {id: this.Id} });
  }
}