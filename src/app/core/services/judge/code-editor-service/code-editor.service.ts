import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { HttpClient } from '@angular/common/http';
import { SourceCodeModel } from 'src/app/core/models/judge/source-code.model';
import { SourceCFGModel } from 'src/app/core/models/judge/source.model';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { MetricsModel } from 'src/app/core/models/judge/metrics.model';
import { Observable } from 'rxjs';
import { SourceCodeInputModel } from 'src/app/core/models/judge/source-code-input.model';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAlgorithmTaskInformation() {
    return this.http.get<CourseModel[]>(this.baseUrl + 'course');
  }
  getAlgorithmTaskParameters() {
    return this.http.get<CourseModel[]>(this.baseUrl + 'course');
  }
  saveVerdict(verdict: VerdictModel) {
    return this.http.post<VerdictModel>(this.baseUrl + 'verdict', verdict);
  }
  compileSourceCode(sourceCode: SourceCodeModel) {
    return this.http.post<SourceCodeModel>(this.baseUrl + 'judge/', sourceCode);
  }
  compileSourceCodeWithInput(sourceCode: SourceCodeInputModel) {
    return this.http.post<SourceCodeModel>(this.baseUrl + 'judge/input/', sourceCode);
  }
  JudgeCode(sourceCode: SourceCodeInputModel) {
    return this.http.post<any>(this.baseUrl + 'judge/judge/', sourceCode);
  }
  executeCompiledFile(sourceCode: any) {
    return this.http.get(this.baseUrl + 'judge/', sourceCode);
  }
  analyze(sourceCode: SourceCFGModel) {
    return this.http.post(this.baseUrl + 'judge/controlflowgraph/', sourceCode);
  }
  getMetrics(sourceCode: SourceCFGModel): Observable<MetricsModel> {
    return this.http.post<MetricsModel>(this.baseUrl + 'judge/metrics/', sourceCode);
  }
  compileAndExecuteSourceCode() {
    return this.http.get(this.baseUrl + 'judge');
  }
  // addCourse(course: CourseAddModel) {
  //   return this.http.post<CourseAddModel[]>(this.baseUrl + 'course/', course);
  // }
  // deleteCourse(courseId: number) {
  //   const url = this.baseUrl + `course/` + courseId;
  //   return this.http.delete(url);
  // }
}
