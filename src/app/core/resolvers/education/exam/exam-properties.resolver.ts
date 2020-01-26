import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';

@Injectable()
export class ExamPropertiesResolver implements Resolve<ExamModel[]> {



    constructor(private examService: ExamService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ExamModel[]> {

        return this.examService.getExam(+ route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}