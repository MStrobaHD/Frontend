import { Component, OnInit, Input } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.scss']
})
export class VideoContentComponent implements OnInit {
  @Input() videoURL: string;
  preload = 'auto';
  api: VgAPI;

  constructor() {}

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.api.getDefaultMedia().currentTime = 0;
    });
  }

  ngOnInit() {
  }
}
