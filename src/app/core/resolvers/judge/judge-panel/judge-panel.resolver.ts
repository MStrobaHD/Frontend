import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';

@Injectable()
export class JudgePanelResolver implements Resolve<CourseModel[]> {

    constructor(private algorithmTaskService: AlgorithmTaskService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<CourseModel[]> {
        return this.algorithmTaskService.getAlgorithmTaskForListAsync().pipe(
            catchError(error => {
                this.alertify.error('Wystąpił błąd podczas ładowania listy zadań');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
