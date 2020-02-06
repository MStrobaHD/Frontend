import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FlashcardSet } from 'src/app/core/models/education/flashcard/flashcardSet.model';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-flashcard-panel',
  templateUrl: './flashcard-panel.component.html',
  styleUrls: ['./flashcard-panel.component.scss']
})
export class FlashcardPanelComponent implements OnInit {

  displayedColumns: string[] = ['flashcardSetName', 'level', 'description', 'buttons'];
  dataSource = new MatTableDataSource();
  sets: FlashcardSet[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private alertifyService: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) {  }

  ngOnInit() {
    this.sets = this.route.snapshot.data.sets;
    this.dataSource = new MatTableDataSource(this.sets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openCardPanel(set) {
    this.router.navigate(['/courses/test_router/' + set.id]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
