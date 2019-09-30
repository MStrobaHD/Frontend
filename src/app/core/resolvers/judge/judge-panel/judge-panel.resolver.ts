import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';

@Injectable()
export class JudgePanelResolver implements Resolve<CourseModel[]> {

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
