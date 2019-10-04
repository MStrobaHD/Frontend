import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AlgorithmListComponent implements OnInit {
  displayedColumns: string[] = [
    'expand',
    'name',
    'category',
    'level',
    'action'
  ];
  dataSource = new MatTableDataSource();
  algorithmTask: AlgorithmTaskListModel[];
  expandedElement: AlgorithmTaskListModel | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private algorithmTaskService: AlgorithmTaskService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAlgorithmTask();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  solveAlgorithm(row) {
    console.log(row);
    this.router.navigate(['/algorithms/editor/', row.id]);
  }
  getAlgorithmTask() {
    this.algorithmTaskService
      .getAlgorithmTaskForListAsync()
      .subscribe(result => {
        this.algorithmTask = result;
        this.dataSource = new MatTableDataSource(this.algorithmTask);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertify.success('Data loaded correctly');
      });
  }
}


