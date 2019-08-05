import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
    console.log('in sidenav');
  }
}
