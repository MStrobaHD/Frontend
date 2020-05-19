import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Router } from '@angular/router';
import { CourseRatingModel } from 'src/app/core/models/education/course/course-rating.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';

@Component({
  selector: 'app-assigned-course',
  templateUrl: './assigned-course.component.html',
  styleUrls: ['./assigned-course.component.scss']
})
export class AssignedCourseComponent implements OnInit {
  
  displayedColumns: string[] = [
    'courseIconUrl',
    'name',
    'description',
    'date',
    'action'
  ];
  courseList: CourseModel[];
  dataSource = new MatTableDataSource();

  rating: CourseRatingModel;
  selected = 0;
  hovered = 0;
  readonly = false;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private groupService: GroupService,
              private alertifyService: AlertifyService,
              private router: Router,
              private courseService: CourseService,) { }

  ngOnInit() {
    this.getCourses();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  getCourses() {
    this.groupService.getCoursesAssignedToUser(+localStorage.getItem('userID')).subscribe(result => {
      this.courseList = result;
      this.dataSource = new MatTableDataSource(this.courseList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.alertifyService.success('Data loaded correctly');
    });
  }
  mark(id: number){
    (this.rating = {
      points: this.hovered,
      userId: +localStorage.getItem('userID'),
      courseId: id
    }),
    console.log(this.rating);
    this.courseService.markTask(this.rating).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
