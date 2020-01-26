import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';
import { Router } from '@angular/router';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

@Component({
  selector: 'app-algorithm-result',
  templateUrl: './algorithm-result.component.html',
  styleUrls: ['./algorithm-result.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class AlgorithmResultComponent implements OnInit {
  selected = 0;
  hovered = 0;

  displayedColumns: string[] = [
    'expand',
    'verdictName',
    'time',
    'memory',
    'elementaryOperation',
    'cyclomaticComplexity',
    'action'
  ];
  dataSource = new MatTableDataSource();
  verdict: VerdictListModel[];
  expandedElement: VerdictListModel | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private algorithmTaskService: AlgorithmTaskService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getVerdicts();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDetails(row) {
    console.log(row);
    this.router.navigate(['/algorithm_result_details', row.id]);
  }
  getVerdicts() {
    this.algorithmTaskService
      .getVerdictsForList(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.verdict = result;
        this.dataSource = new MatTableDataSource(this.verdict);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertify.success('Lista werdyktów została wczytana');
      });
  }
}
