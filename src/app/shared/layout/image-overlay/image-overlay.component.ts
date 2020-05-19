import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss']
})
export class ImageOverlayComponent implements OnInit {
  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }
}