import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from '../floating-button/floating-button.animations';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {
  fabButtons = [
    {
      icon: 'timeline'
    },
    {
      icon: 'view_headline'
    },
    {
      icon: 'room'
    },
    {
      icon: 'lightbulb_outline'
    },
    {
      icon: 'lock'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  ngOnInit(): void {}

  constructor() {}

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
}
