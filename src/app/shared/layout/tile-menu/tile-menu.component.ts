import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tile-menu',
  templateUrl: './tile-menu.component.html',
  styleUrls: ['./tile-menu.component.scss']
})
export class TileMenuComponent implements OnInit {
  tileMenuSelector = false;
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {}
  redirect(path: string) {
    this.router.navigate([path]);
  }

isLogged() {
  if (this.authService.loggedIn()) {
    return true;
  } else {
    return false;
  }
}
}
