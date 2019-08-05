import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-side',
  templateUrl: './navigation-side.component.html',
  styleUrls: ['./navigation-side.component.scss']
})
export class NavigationSideComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onClose() {
    this.closeSidenav.emit();
  }
}
