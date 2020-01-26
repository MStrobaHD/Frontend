import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { UserModel } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  user: UserModel;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService
      .getUserData(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.user = result;
        this.alertifyService.success('Data loaded correctly');
      });
  }
}
