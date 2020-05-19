import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionAddModel } from 'src/app/core/models/education/question/question-add.model';
import { HttpClient } from '@angular/common/http';
import { ChooseQuestionAddModel } from 'src/app/core/models/education/question/choose-question-add.model';
import { DragDropAddModel } from 'src/app/core/models/education/question/drag-drop-add-model';
import { DragDropModel } from 'src/app/core/models/education/exam/dragdrop.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getCourses() {
  //   return this.http.get<Les[]>(this.baseUrl + 'course');
  // }
  addQuestion(question: QuestionAddModel) {
    return this.http.post<QuestionAddModel>(this.baseUrl + 'question/', question);
  }
  addChooseQuestion(chooseQuestion: ChooseQuestionAddModel) {
    return this.http.post<ChooseQuestionAddModel>(this.baseUrl + 'question/multiSelectQuestion/', chooseQuestion);
  }
  addDragDrop(cloudAsset: DragDropAddModel) {
    return this.http.post<DragDropAddModel>(this.baseUrl + 'question/orderedBlock', cloudAsset);
  }
  // getExamNormalQuestion(examId: number) {
  //   return this.http.get<QuestionAddModel[]>(this.baseUrl + 'Question/' + examId);
  // }
  getExamChooseQuestions(examId: number) {
    return this.http.get<ChooseQuestionAddModel[]>(this.baseUrl + 'Question/multiSelectQuestion/' + examId);
  }
  getExamDragDrop(examId: number) {
    return this.http.get<DragDropModel[]>(this.baseUrl + 'Question/orderedBlock/' + examId);
  }
  // deleteCourse(courseId: number) {
  //   const url = this.baseUrl + `course/` + courseId;
  //   return this.http.delete(url);
  // }
}
