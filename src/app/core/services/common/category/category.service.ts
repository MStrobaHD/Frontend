import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from 'src/app/core/models/common/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryModel[]>(this.baseUrl + 'category');
  }
  // addCategory(course: CourseAddModel) {
  //   return this.http.post<CourseAddModel[]>(this.baseUrl + 'course/', course);
  // }
}
