import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { ServerModel } from 'src/app/core/models/common/server/server.model';
import { CloudModel } from 'src/app/core/models/common/cloud/cloud.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getCourses() {
  //   return this.http.get<Les[]>(this.baseUrl + 'course');
  // }
  addLesson(lesson: LessonModel) {
    return this.http.post<LessonModel>(this.baseUrl + 'lesson/', lesson);
  }
  addServerAsset(serverAsset: ServerModel) {
    return this.http.post<ServerModel>(this.baseUrl + 'lesson/serverAsset', serverAsset);
  }
  addCloudAsset(cloudAsset: CloudModel) {
    return this.http.post<LessonModel>(this.baseUrl + 'lesson/cloudAsset', cloudAsset);
  }
  // deleteCourse(courseId: number) {
  //   const url = this.baseUrl + `course/` + courseId;
  //   return this.http.delete(url);
  // }
}
