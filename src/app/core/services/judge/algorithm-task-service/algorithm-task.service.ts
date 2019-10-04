import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmTaskService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAlgorithmTaskForListAsync() {
    return this.http.get<AlgorithmTaskListModel[]>(this.baseUrl + 'algorithmTask/');
  }
  // getExam(examId: number) {
  //   return this.http.get<ExamModel[]>(this.baseUrl + 'exam/' + examId);
  // }
  // getExamByCategory(categoryId: number) {
  //   return this.http.get<ExamModel[]>(this.baseUrl + 'exam/' + categoryId);
  // }
  // addExam(exam: ExamAddModel) {
  //   return this.http.post<ExamAddModel[]>(this.baseUrl + 'exam/', exam);
  // }
  // deleteExam(examId: number) {
  //   const url = this.baseUrl + `exam/` + examId;
  //   return this.http.delete(url);
  // }
}