import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  isLessonListVisible = true;
  displayedColumns: string[] = [ 'isWatched', 
                                 'courseIconUrl',
                                 'name',
                                 'description',
                                 'date',
                                 'action',
                                 ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();

  lessonList: LessonModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.lessonList = this.route.snapshot.data.lessonList;
      console.log(this.lessonList);
      this.dataSource = new MatTableDataSource(this.lessonList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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


