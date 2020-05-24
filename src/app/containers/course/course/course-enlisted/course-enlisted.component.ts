import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';
import { CourseRatingModel } from 'src/app/core/models/education/course/course-rating.model';

@Component({
  selector: 'app-course-enlisted',
  templateUrl: './course-enlisted.component.html',
  styleUrls: ['./course-enlisted.component.scss']
})
export class CourseEnlistedComponent implements OnInit {
  displayedColumns: string[] = [
    'courseIconUrl',
    'progress',
    'name',
    'description',
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public bookmarkRoot: CourseService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService
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
      .getEnroledCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
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
