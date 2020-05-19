import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { SolutionModel } from 'src/app/core/models/education/group/group.model';
import { ComparatorDialogComponent } from '../comparator-dialog/comparator.dialog';
import { ComparatorData } from '../comparator-dialog/comparator.dialog';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';
import { SolutionViewerDialogComponent } from '../solution-viewer-dialog/solution-viewer.dialog';
import { VerdictService } from 'src/app/core/services/judge/verdict-service/verdict.service';

@Component({
  selector: 'app-group-solution-list',
  templateUrl: './group-solution-list.component.html',
  styleUrls: ['./group-solution-list.component.scss']
})
export class GroupSolutionListComponent implements OnInit {
  displayedColumns: string[] = [
    'verdictName',
    'studentName',
    'isCopied',
    'algorithmTaskId'
  ];
  dataSource = new MatTableDataSource();
  taskList: AlgorithmTaskListModel[];
  verdictList: SolutionModel[];
  solutionList: VerdictListModel[];
  actualSolution: VerdictListModel;
  metrics: VerdictListModel;
  dialogData: ComparatorData;
  verdictID: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private taskService: AlgorithmTaskService,
    public dialog: MatDialog,
    public solutionDialog: MatDialog,
    private groupService: GroupService,
    private alertifyService: AlertifyService,
    private verdictService: VerdictService
  ) {}

  ngOnInit() {
    this.getTasks();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTasks() {
    this.taskService.getAlgorithmTaskForListAsync().subscribe(result => {
      this.taskList = result;
    });
  }
  getVerdictOfGroupByTaskId(taskId: number) {
    this.groupService
      .getVerdictOfGroupByTask(+localStorage.getItem('groupId'), taskId)
      .subscribe(result => {
        this.verdictList = result;
        this.dataSource = new MatTableDataSource(this.verdictList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getCopies(verdictId: number) {
    this.getActualVerdict(verdictId);
    this.groupService.getCopiesOfVerdict(verdictId).subscribe(result => {
      this.solutionList = result;
      console.log(this.solutionList[0].solution);
      this.openComparatorDialog();
    });
  }
  getActualVerdict(verdictId: number) {
    this.groupService.getVerdict(verdictId).subscribe(result => {
      this.actualSolution = result;
      this.verdictID = verdictId;
      this.openSolutionViewerDialog();
    });
  }
  getActualVerdictWithMetrics(verdictId: number) {
    this.verdictService.getVerdictWithMetrics(verdictId).subscribe(result => {
      this.metrics = result;
      this.verdictID = verdictId;
      this.openSolutionViewerDialog();
    });
  }
  updateVerdict() {
    this.groupService.updateVerdict(this.verdictID, 'Accepted').subscribe(result => {
      this.alertifyService.success('Pomyślnie zatwierdzono zadanie');
    });
  }
  openComparatorDialog(): void {
    if (this.solutionList) {
    const dialogRef = this.dialog.open(ComparatorDialogComponent, {
      width: '60%',
      data: {
        solutionList: this.solutionList,
        actualSolution: this.actualSolution
      }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.updateVerdict();
      }
    });
  }
  }
  openSolutionViewerDialog(): void {
    if (this.metrics) {
    const dialogRef = this.solutionDialog.open(SolutionViewerDialogComponent, {
      width: '60%',
      data: {
        actualSolution: this.metrics
      }});
    dialogRef.afterClosed().subscribe(result => {});
  }
  }
}
