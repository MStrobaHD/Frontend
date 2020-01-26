import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { CategoryModel } from 'src/app/core/models/common/category/category.model';
import { LevelModel } from 'src/app/core/models/judge/level.model';
import { ComplexityModel } from 'src/app/core/models/judge/complexity.model';
import { AlgorithmCategoryModel } from 'src/app/core/models/judge/algorithm-category.model';
import { VerificationDataAddModel } from 'src/app/core/models/judge/verification-data-add.model';
import { RestrictionsAddModel } from 'src/app/core/models/judge/restrictions.model';
import { AlgorithmTaskAddModel } from 'src/app/core/models/judge/algorithm-task-add.model';
import { RatingModel } from 'src/app/core/models/judge/rating.model';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmTaskService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAlgorithmTaskForListAsync() {
    return this.http.get<AlgorithmTaskListModel[]>(this.baseUrl + 'algorithmTask/');
  }
  getAlgorithmTaskForSolveAsync(algorithmTaskId: number) {
    return this.http.get<AlgorithmTaskListModel>(this.baseUrl + 'algorithmTask/' + algorithmTaskId);
  }

  getAlgortihmCategories() {
    return this.http.get<AlgorithmCategoryModel>(this.baseUrl + 'algorithmCategory/');
  }
  getLevels() {
    return this.http.get<LevelModel>(this.baseUrl + 'level/');
  }
  getComplexities() {
    return this.http.get<ComplexityModel>(this.baseUrl + 'complexity/');
  }
 addVerificationData(verificationData: VerificationDataAddModel) {
    return this.http.post<VerificationDataAddModel[]>(this.baseUrl + 'verificationData/', verificationData);
  }
  addRestriction(restriction: RestrictionsAddModel) {
    return this.http.post<RestrictionsAddModel[]>(this.baseUrl + 'restriction/', restriction);
  }
  addAlgorithm(algorithm: AlgorithmTaskAddModel) {
    return this.http.post<RestrictionsAddModel>(this.baseUrl + 'algorithmTask/', algorithm);
  }
  markTask(rating: RatingModel) {
    return this.http.post<RestrictionsAddModel>(this.baseUrl + 'algorithmTask/rating', rating);
  }
  getVerdictsForList(userId: number) {
    return this.http.get<VerdictListModel[]>(this.baseUrl + 'verdict/'+userId);
  }
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