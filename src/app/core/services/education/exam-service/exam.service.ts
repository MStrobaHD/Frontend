import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';
import { ExamAddModel } from 'src/app/core/models/education/exam/examAdd.model';
import { ExamResultAddModel } from 'src/app/core/models/education/result/exam-result-add.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  baseUrl = environment.apiUrl;
  public httpOptions = {
    responseType: 'text'
  };

  constructor(private http: HttpClient) {}

  getExams() {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam');
  }
  getExam(examId: number) {
    return this.http.get<ExamModel>(this.baseUrl + 'exam/' + examId);
  }
  getCourseExams(courseId: number) {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam/course/' + courseId);
  }
  getNotMarkedExams(courseId: number, userId: number) {
    const url =
      this.baseUrl + `exam/course/notopened?courseId=${courseId}&userId=${userId}`;
    return this.http.get<ExamModel[]>(url);
  }
  getExamByCategory(categoryId: number) {
    return this.http.get<ExamModel[]>(this.baseUrl + 'exam/' + categoryId);
  }
  addExam(exam: ExamAddModel) {
    return this.http.post<ExamAddModel[]>(this.baseUrl + 'exam/', exam);
  }
  deleteExam(examId: number) {
    const url = this.baseUrl + `exam/` + examId;
    return this.http.delete(url);
  }
  saveResult(result: ExamResultAddModel) {
    return this.http.post<any>(this.baseUrl + 'examResult/', result);
  }
  getExamResults(userId: number) {
    return this.http.get<ExamResultAddModel[]>(this.baseUrl + 'examResult/' + userId);
  }
}
