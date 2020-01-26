import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.apiUrl;

  invokeSecondComponentFunction = new EventEmitter();
  subsVarSecond: Subscription;
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) {}

  // getCourses() {
  //   return this.http.get<CourseModel[]>(this.baseUrl + 'course');
  // }
  getCourses(userId: number) {
    return this.http.get<CourseModel[]>(
      this.baseUrl + 'course/noenroled/' + userId
    );
  }
  getEnroledCourses(userId: number) {
    return this.http.get<CourseModel[]>(
      this.baseUrl + 'course/enroled/' + userId
    );
  }
  addCourse(course: CourseAddModel) {
    return this.http.post<CourseAddModel[]>(this.baseUrl + 'course/', course);
  }
  deleteCourse(courseId: number) {
    const url = this.baseUrl + `course/` + courseId;
    return this.http.delete(url);
  }
  enlistCourse(enlistParameters: EnlistParameter) {
    // this.invokeFirstComponentFunction.emit();
    return this.http.post<EnlistParameter>(
      this.baseUrl + 'course/enrolment/',
      enlistParameters
    );
  }
  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }
  onSecondComponentButtonClick() {
    this.invokeSecondComponentFunction.emit();
  }
  dislistCourse(enlistParameters: EnlistParameter) {
    // this.invokeFirstComponentFunction.emit();
    const userId = enlistParameters.userId;
    const courseId = enlistParameters.courseId;
    const url =
      this.baseUrl + `course/enrolment?userId=${userId}&courseId=${courseId}`;
    return this.http.delete(url);
  }
}
