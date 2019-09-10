import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<CourseModel[]>(this.baseUrl + 'course');
  }
  addCourse(course: CourseAddModel) {
    return this.http.post<CourseAddModel[]>(this.baseUrl + 'course/', course);
  }
  deleteCourse(courseId: number) {
    const url = this.baseUrl + `course/` + courseId;
    return this.http.delete(url);
  }
  // getMyCourses(id: number) {
  //   return this.http.get<Course[]>(this.baseUrl + 'courses/created/' + id);
  // }
  // getAllCourses() {
  //   return this.http.get<Course[]>(this.baseUrl + 'courses');
  // }
  // getAllExams(id: number) {
  //   return this.http.get<Exam[]>(this.baseUrl + 'exams/available/' + id);
  // }
  // addCourse(course: Course) {
  //   return this.http.post<Exam[]>(this.baseUrl + 'courses/', course);
  // }
  // enrolCourse(courseEnrol: courseEnrolments) {
  //   return this.http.post<courseEnrolments[]>(
  //     this.baseUrl + 'courseenrolments/',
  //     courseEnrol
  //   );
  // }
  // deleteUserEnrolment(user_id: number, course_id: number) {
  //   const url =
  //     this.baseUrl +
  //     `courseenrolments/for_delete?user_id=${user_id}&course_id=${course_id}`;
  //   return this.http.delete(url);
  // }
 
}

