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

  editable = false;
  user: UserModel;
  model: any = {};
  userId: number;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.getUserData();
    this.userId = +localStorage.getItem('userID');
  }
  showEditForm(){
    this.editable = true;
  }
  updateUserData() {
    this.editable = false;
    console.log(this.userId);
    this.authService.updateUserData( this.userId, this.model).subscribe(
      next => {
        this.alertifyService.success('Dane zostały zaktualizowane');
        this.getUserData();
      },
      error => {
       this.alertifyService.error(error);
      });
  }
  closeEditForm(){
    this.editable = false;
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
