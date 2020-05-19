import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { BadgeModel } from 'src/app/core/models/user/badge.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  displayedColumns: string[] = ['imageUrl', 'badgeName', 'experiencePoints', 'description'];
  dataSource = new MatTableDataSource();
  badges: BadgeModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private auth: AuthService,
              private alertify: AlertifyService) {

  }

  ngOnInit() {
    this.getResults();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getResults() {
    this.auth.getUserBadges(+ localStorage.getItem('userID')).subscribe((badges: BadgeModel[]) => {
      this.badges = badges;
      this.dataSource = new MatTableDataSource(this.badges);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
