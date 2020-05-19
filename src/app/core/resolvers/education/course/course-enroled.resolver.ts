import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Injectable } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CourseEnroledListResolver implements Resolve<CourseModel[]> {
  constructor(
    private courseService: CourseService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CourseModel[]> {
    return this.courseService.getEnroledCourses(+ localStorage.getItem('userID')).pipe(
      catchError(error => {
        this.alertify.error('Wystąpił problem podczas ładowania danych');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
