import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashcardAdd } from 'src/app/core/models/education/flashcard/flashcardAdd.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Flashcard } from 'src/app/core/models/education/flashcard/flashcard.model';

@Component({
  selector: 'app-flashcard-add',
  templateUrl: './flashcard-add.component.html',
  styleUrls: ['./flashcard-add.component.scss']
})
export class FlashcardAddComponent implements OnInit {

  isVisibleCardForm = true;
  flashcardLists: Flashcard[];
  addCardForm: FormGroup;
  addCardObject: FlashcardAdd;

  displayedColumns: string[] = [
    'urlobrazka',
    'firstSide',
    'backSide',
    'hint',
    'action'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  id: number;
  private sub: any;
  constructor(private fb: FormBuilder,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private flashcardService: FlashcardService,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.cardId;
    });
    this.flashcardLists = this.route.snapshot.data.cards.flashcard;
    this.dataSource = new MatTableDataSource(this.flashcardLists);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createAddCardForm();
    this.getCards();
  }
  getCards(){
    this.flashcardService
      .getFlashcardListBetterMapping(this.id)
      .subscribe(result => {
        this.flashcardLists = result;
        this.dataSource = new MatTableDataSource(this.flashcardLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertify.success('Fiszki załadowane');
      });
  }
  createAddCardForm() {
    this.addCardForm = this.fb.group({
      frontSide: ['', Validators.required],
      backSide: ['', Validators.required],
      hint: ['', Validators.required],
      flashcardSetId: [this.id, Validators.required],
      imageUrl: ['', Validators.required]
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showCourseForm() {
    this.isVisibleCardForm = true;
  }
  closeCardForm() {
    this.isVisibleCardForm = false;
  }
  return() {
    this.router.navigate(['/courses/']);
  }
  deleteCard(set) {
    this.flashcardService.deleteFlashcard(set.id).subscribe(
      () => {
        this.alertify.success('Fiszka została usunięta');
        this.getCards();
      },
      error => {
        this.alertify.error(error);
      });
  }
  addCard() {
    if (this.addCardForm.valid) {
      this.addCardObject = Object.assign({}, this.addCardForm.value);
      this.flashcardService.addFlashcard(this.addCardObject).subscribe(
        () => {
          this.getCards();
          this.alertify.success('Fiszka została dodana');
        },
        error => {
          this.alertify.error(error);
        });
    }
  }
}
