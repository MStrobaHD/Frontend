import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultSheet } from 'src/app/core/models/education/group/group.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmDialogComponent } from 'src/app/shared/layout/confirm-dialog/confirm-dialog';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'icon',
    'username',
    'email',
    'action'
  ];

  expandedElement: ResultSheet | null;
  teacherGroupList: ResultSheet[];
  dataSource = new MatTableDataSource();
  
  groupId: number;
  groupName: string;


  confirm = false;
  showPerTask = false;
  showPerStudent = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertifyService: AlertifyService,
              private groupService: GroupService,
              private dialog: MatDialog,
              private taskService: AlgorithmTaskService,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = +params.groupId;
      this.groupName = params.groupName;
    });
    localStorage.setItem('groupId', this.groupId.toString())
    this.getResultOfGroup(this.groupId);
  }
  return() {
    this.location.back();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  RemoveStudentFromGroup(studentId: number) {
    this.openConfirmDialog();
    if (this.confirm === true) {
      this.groupService.DeleteSTGAssignment(studentId, this.groupId).subscribe(
        () => {
          this.alertifyService.success('Student został usunięty z grupy');
          this.getResultOfGroup(this.groupId);
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  getResultOfGroup(groupId: number) {
    this.groupService.getResultOfGroup(groupId).subscribe(result => {
      this.teacherGroupList = result;
      this.dataSource = new MatTableDataSource(this.teacherGroupList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.alertifyService.success('Wyniki grupy zostały załadowane');
    });
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message:
          'Czy napewno chcesz usunąć studenta z grupy?',
        buttonYes: 'Tak',
        buttonNo: 'Nie'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirm = result;
      console.log(result);
    });
  }
  showContent(content: number) {
    if (content === 1) {
      this.showPerStudent = true;
    } else {
      this.showPerStudent = false;
    }
    if (content === 2) {
      this.showPerTask = true;
    } else {
      this.showPerTask = false;
    }
    if (content >= 3) {
      this.showPerStudent = false;
      this.showPerTask = false;
    }
  }
}
