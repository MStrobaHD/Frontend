import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';
import { ExamAddModel } from 'src/app/core/models/education/exam/examAdd.model';
import { ExamResultAddModel } from 'src/app/core/models/education/result/exam-result-add.model';
import { FlashcardSet } from 'src/app/core/models/education/flashcard/flashcardSet.model';
import { FlashcardSetAdd } from 'src/app/core/models/education/flashcard/flashcardSetAdd.model';
import { FlashcardAdd } from 'src/app/core/models/education/flashcard/flashcardAdd.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // flashcard set
  getFlashcardSets() {
    return this.http.get<FlashcardSet[]>(this.baseUrl + 'flashcardSet');
  }
  getFlashcardSet(setId: number) {
    return this.http.get<FlashcardSet>(this.baseUrl + 'flashcardSet/' + setId);
  }
  getFlashcardSetsOfCourse(courseId: number) {
    return this.http.get<FlashcardSet>(this.baseUrl + 'flashcardSet/course/' + courseId);
  }
  AddFlashcardSet(set: FlashcardSetAdd) {
    return this.http.post<FlashcardSetAdd[]>(this.baseUrl + 'flashcard/', set);
  }
  DeleteFlashcardSet(setId: number) {
    return this.http.delete(this.baseUrl + 'flashcardSet/' + setId);
  }

  // flashcard 
  addFlashcard(card: FlashcardAdd) {
    return this.http.post<FlashcardAdd[]>(this.baseUrl + 'flashcard/', card);
  }
  deleteFlashcard(cardId: number) {
    const url = this.baseUrl + `flashcard/` + cardId;
    return this.http.delete(url);
  }
  getFlashcardList(setId: number) {
    return this.http.get<any>(this.baseUrl + 'flashcard/' + setId);
  }
}
