import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExams() {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam');
  }
  getExam(examId: number) {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam/' + examId);
  }
  getExamByCategory(categoryId: number) {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam/' + categoryId);
  }
  // addExam(exam: ExamAddModel) {
  //   return this.http.post<ExamAddModel[]>(this.baseUrl + 'exam/', exam);
  // }
  deleteExam(examId: number) {
    const url = this.baseUrl + `exam/` + examId;
    return this.http.delete(url);
  }
}
