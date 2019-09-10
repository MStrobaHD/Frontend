import { Injectable } from '@angular/core';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

@Injectable()
export class CourseListResolver implements Resolve<CourseModel[]> {

    constructor(private courseService: CourseService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<CourseModel[]> {
        return this.courseService.getCourses().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
