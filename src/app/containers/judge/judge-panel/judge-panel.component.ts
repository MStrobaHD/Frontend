import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-panel',
  templateUrl: './judge-panel.component.html',
  styleUrls: ['./judge-panel.component.scss']
})
export class JudgePanelComponent implements OnInit {
  step = 0;
  selected = 0;
  hovered = 0;
  readonly = false;
  
  constructor() { }

  ngOnInit() {
  }

}
