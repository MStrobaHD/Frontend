import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { ActivatedRoute } from '@angular/router';
import { VgAPI } from 'videogular2/compiled/core';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LessonComponent implements OnInit {
  preload = 'auto';
  api: VgAPI;
  isLessonListVisible = true;
  isPDF = false;
  expandedElement: VerdictListModel | null;
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
      this.api.getDefaultMedia().currentTime = 0;
    });
  }
  hideLessonList() { 
    this.isLessonListVisible = false;
  }
  passURL(url: string, type: string) {
    if( type === 'application/pdf') {
      this.isPDF = true;
      this.hideLessonList();
    } else {
      this.isPDF = false;
      this.hideLessonList();
    }
    this.hideLessonList();
    this.url = null;
    this.url = url;
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


