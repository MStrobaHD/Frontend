import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { ActivatedRoute } from '@angular/router';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  preload = 'auto';
  api: VgAPI;
  isLessonListVisible = true;
  displayedColumns: string[] = [ 'isWatched', 
                                 'courseIconUrl',
                                 'name',
                                 'action',
                                 ];
  dataSource = new MatTableDataSource();
  lessonList: LessonModel[];
  url: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) {

  }
  ngOnInit() {
      this.lessonList = this.route.snapshot.data.lessonList;
      this.dataSource = new MatTableDataSource(this.lessonList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      // Set the video to the beginning
      this.api.getDefaultMedia().currentTime = 0;
    });
  }
  hideLessonList() { 
    this.isLessonListVisible = false;
  }
  passURL(url: string){
    this.url = null;
    this.url = url;
    this.hideLessonList();
    this.ngOnInit();
  }
  openAsset() {}
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


