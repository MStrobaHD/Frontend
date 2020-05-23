import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {
  FlashcardSet,
  FlashcardSetAddModel,
} from 'src/app/core/models/education/flashcard/flashcardSet.model';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-flashcard-panel',
  templateUrl: './flashcard-panel.component.html',
  styleUrls: ['./flashcard-panel.component.scss'],
})
export class FlashcardPanelComponent implements OnInit {
  value = '';
  displayedColumns: string[] = [
    'level',
    'flashcardSetName',
    'description',
    'buttons',
  ];
  isStudent: string;
  dataSource = new MatTableDataSource();
  sets: FlashcardSet[];
  addSetForm: FormGroup;
  addSetObject: FlashcardSetAddModel;
  courseId: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private alertifyService: AlertifyService,
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.courseId = +params.courseId;
    });
    this.isStudent = localStorage.getItem('role');
    this.sets = this.route.snapshot.data.sets;
    this.dataSource = new MatTableDataSource(this.sets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createAddSetForm();
  }
  deleteCourse(row: any) {
    this.flashcardService.DeleteFlashcardSet(row.id).subscribe(
      () => {
        this.alertifyService.success('Zestaw został usunięty');
        this.getSets();
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }
  createAddSetForm() {
    this.addSetForm = this.fb.group({
      flashcardSetName: ['', [Validators.required]],
      level: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: ['', [Validators.required]],
      userId: [+localStorage.getItem('userID')],
      courseId: [this.courseId],
    });
  }
   checkError = (controlName: string, errorName: string) => {
    return this.addSetForm.controls[controlName].hasError(errorName);
  }
  addCourse() {
    if (this.addSetForm.valid) {
      this.addSetObject = Object.assign({}, this.addSetForm.value);
      this.flashcardService.AddFlashcardSet(this.addSetObject).subscribe(
        () => {
          this.alertifyService.success('Zestaw został dodany');
          this.getSets();
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  getSets(){
    this.flashcardService.getFlashcardSetsOfCourse(this.courseId)
      .subscribe(result => {
        this.sets = result;
        this.dataSource = new MatTableDataSource(this.sets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  openCardPanel(set) {
    this.router.navigate(['/courses/test_router/' + set.id]);
  }
  openCardForm(set) {
    this.router.navigate(['/courses/card-add/' + set.id]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
