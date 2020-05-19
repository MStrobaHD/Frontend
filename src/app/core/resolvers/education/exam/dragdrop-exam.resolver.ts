import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { DragDropModel } from 'src/app/core/models/education/exam/dragdrop.model';
import { QuestionService } from 'src/app/core/services/education/question-service/question.service';

@Injectable()
export class DragDropResolver implements Resolve<DragDropModel[]> {



    constructor(private questionService: QuestionService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<DragDropModel[]> {

        return this.questionService.getExamDragDrop(+ route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas ładowania danych');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}