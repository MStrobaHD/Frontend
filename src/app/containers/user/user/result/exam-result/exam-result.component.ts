import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { ExamResultAddModel } from 'src/app/core/models/education/result/exam-result-add.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';


@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {
  displayedColumns: string[] = ['icon','mark', 'points', 'progress'];
  dataSource = new MatTableDataSource();
  results: ExamResultAddModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private examService: ExamService,
              private auth: AuthService,
              private alertify: AlertifyService) {

  }

  ngOnInit() {
    this.getResults();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getResults() {
    
    this.examService.getExamResults(+ localStorage.getItem('userID')).subscribe(result => {
      this.results = result;
      this.dataSource = new MatTableDataSource(this.results);
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
}
