import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TutorialDialogComponent } from '../tutorial-dialog/tutorial-dialog';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) {}
  ngOnInit(): void {
  }
  openTutorialDialog(): void {
    const dialogRef = this.dialog.open(TutorialDialogComponent, {
      width: '1000px',
      data: {
        message:
          '../../../../assets/instrukcja.pdf',
        buttonYes: 'Tak',
        buttonNo: 'Nie'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     // this.confirm = result;
      console.log(result);
    });
  }
  isLogged() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}