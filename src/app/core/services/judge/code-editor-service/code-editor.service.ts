import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { HttpClient } from '@angular/common/http';
import { SolutionModel } from 'src/app/core/models/judge/solution.model';
import { SourceCodeModel } from 'src/app/core/models/judge/source-code.model';

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
  saveSolution(solution: SolutionModel) {
    return this.http.post<SolutionModel[]>(this.baseUrl + 'judge', solution);
  }
  compileSourceCode(sourceCode: SourceCodeModel) {
    return this.http.post<SourceCodeModel[]>(this.baseUrl + 'judge', sourceCode);
  }
  executeCompiledFile() {
    return this.http.get(this.baseUrl + 'judge');
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
