import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-flashcard-studying',
  templateUrl: './flashcard-studying.component.html',
  styleUrls: ['./flashcard-studying.component.scss']
})
export class FlashcardStudyingComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = ['frontside', 'backside', 'learned', 'delete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  flashcardLists: any = {};
  origin: any;
  flipped = false;

  id: number;
  i: any = 0;
  counter: any = 0;
  private sub: any;
  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.flashcardLists = this.route.snapshot.data.cards.flashcard;
    this.origin = this.flashcardLists;
    this.getFlashcards();
  }
  return() {
    this.location.back();
  }
  iterate() {
    if (this.i < this.counter - 1) {
      this.i++;
      this.ngOnInit();
    } else {
      this.i = 0;
      this.ngOnInit();
    }
  }
  deiterate() {
    if (this.i <= 0) {
      this.i = this.counter - 1;
      this.ngOnInit();
    } else {
      this.i--;
      this.ngOnInit();
    }
  }
  flip() {
    this.flipped = !this.flipped;
  }
  loadQuestions() {}
  getFlashcards() {
    const arr = [];

    this.flashcardLists.forEach(flashcardLists => arr.push(flashcardLists));
    const customArr = arr[this.i];
    this.flashcardLists = customArr;

    this.counter = arr.length;
    this.dataSource = new MatTableDataSource(customArr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
