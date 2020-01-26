import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';

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
  getEnlistedCourses() {
    this.courseService
      .getEnroledCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.courses = result;
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertify.success('Data loaded correctly');
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
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertify.error(error.error);
      }
    );
  }
  openCourse(course) {
    this.router.navigate(['/courses/course_panel']);
  }
  openExamPanel(course) {
    this.router.navigate(['/courses/exampanel/' + course.id]);
  }
}
