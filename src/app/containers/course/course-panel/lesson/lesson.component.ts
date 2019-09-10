import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  isLessonListVisible = true;
  displayedColumns: string[] = [ 'courseIconUrl','name', 'description', 'date', 'action'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();

  courses: CourseModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private courseService: CourseService) {

  }

  ngOnInit() {

    this.courseService.getCourses()
    .subscribe(result => {

      this.courses = result;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    console.log(this.courses);

  }
  hideLessonList(){ 
    this.isLessonListVisible = false;
  }
  expandLessonList(){
    this.isLessonListVisible = true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


