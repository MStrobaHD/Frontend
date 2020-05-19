import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { GroupModel } from 'src/app/core/models/education/group/group.model';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  displayedColumns: string[] = [
    'icon',
    'groupName',
    'groupType',
    'action'
  ];
  teacherGroupList: GroupModel[];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private alertifyService: AlertifyService,
              private router: Router,
              private groupService: GroupService) { }

  ngOnInit() {
    this.getGroupsOfTeacher();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openGroup(groupId: number, groupName: string) {
    this.router.navigate(['/group/teacher_panel/' + groupId + '/' + groupName]);
  }
  getGroupsOfTeacher() {
    this.groupService.getMyGroup(+localStorage.getItem('userID')).subscribe(result => {
      this.teacherGroupList = result;
      this.dataSource = new MatTableDataSource(this.teacherGroupList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alertifyService.success('Moje grupy szkoleniowe zostały wczytane');
    });
  }
}
