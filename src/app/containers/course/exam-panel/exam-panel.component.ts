import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { FormBuilder } from '@angular/forms';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';

@Component({
  selector: 'app-exam-panel',
  templateUrl: './exam-panel.component.html',
  styleUrls: ['./exam-panel.component.scss']
})
export class ExamPanelComponent implements OnInit {
  isVisibleCourseForm = false;
  displayedColumns: string[] = [
    'examType',
    'examName',
    'numberOfQuestion',
    'timeForSolve',
    'action'
  ];

  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();
  exams: ExamModel[];

  selected = 0;
  hovered = 0;
  readonly = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.getCourseExams();
  }

  getCourseExams() {
    this.examService
      .getNotMarkedExams(+this.route.snapshot.paramMap.get('courseId'), + localStorage.getItem('userID'))
      .subscribe(result => {
        this.exams = result;
        this.dataSource = new MatTableDataSource(this.exams);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertify.success('Data loaded correctly');
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openExam(exam) {
    if (exam.examType === 1) {
      
    } else if (exam.examType === 2) {
      this.router.navigate(['/courses/exam/' + exam.id]);
    } else {
      this.router.navigate(['/courses/dragdrop/' + exam.id]);
    }
  }

}
