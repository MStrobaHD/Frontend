import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  role: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.role = this.authService.isAdmin();
  }

}
