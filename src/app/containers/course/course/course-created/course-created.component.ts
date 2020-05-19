import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CourseRatingModel } from 'src/app/core/models/education/course/course-rating.model';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ConfirmDialogComponent } from 'src/app/shared/layout/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-course-created',
  templateUrl: './course-created.component.html',
  styleUrls: ['./course-created.component.scss']
})
export class CourseCreatedComponent implements OnInit {
  displayedColumns: string[] = [
    'courseIconUrl',
    // 'progress',
    'name',
    'date',
    'action'
  ];
  selected = 0;
  hovered = 0;
  readonly = false;
  rating: CourseRatingModel;

  dataSource = new MatTableDataSource();
  courses: CourseModel[];
  enlistParamters: EnlistParameter;
  confirm: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public bookmarkRoot: CourseService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.courseService.subsVar === undefined) {
      this.courseService.subsVar = this.courseService.invokeFirstComponentFunction.subscribe(
        (name: string) => {
          this.getEnlistedCourses();
        }
      );
    }
    this.getEnlistedCourses();
  }
  mark(id: number){
    (this.rating = {
      points: this.hovered,
      userId: +localStorage.getItem('userID'),
      courseId: id
    }),
    this.courseService.markTask(this.rating).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getEnlistedCourses() {
    this.courseService
      .getCreatedCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.courses = result;
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getCourses() {
    this.courseService.getCourses(+localStorage.getItem('userID')).subscribe(result => {
      this.courses = result;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  dislistCourse(course) {
    this.enlistParamters = {
      userId: +localStorage.getItem('userID'),
      courseId: course.id
    };

    this.courseService.dislistCourse(this.enlistParamters).subscribe(
      () => {
        this.alertify.success('Zostałeś wypisany z kursu');
        this.getEnlistedCourses();
        this.courseService.onSecondComponentButtonClick();
      },
      error => {
        this.alertify.error(error.error);
      }
    );
  }
  editCourse(course) {
    this.router.navigate(['/courses/course_edition_panel/'  + course.id]);
  }
  deleteCourse(course) {
    this.openConfirmDialog();
    if (this.confirm === true) {
    this.courseService.deleteCourse(course.id).subscribe(
      () => {
        this.alertify.success('Kurs został usuniety');
        this.getCourses();
      },
      error => {
        this.alertify.error(error);
      }
    );
    }
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message:
          'Czy napewno chcesz usunąć ten kurs?',
        buttonYes: 'Tak',
        buttonNo: 'Nie'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirm = result;
    });
  }
  openCourse(course) {
    this.router.navigate(['/courses/course_panel/' + course.id]);
  }
  openExamPanel(course) {
    this.router.navigate(['/courses/exampanel/' + course.id]);
  }
  openCardPanel(course) {
    this.router.navigate(['/courses/flashcard-panel/' + course.id]);
  }
}