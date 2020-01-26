import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ChooseQuestionAddModel } from 'src/app/core/models/education/question/choose-question-add.model';
import { QuestionService } from 'src/app/core/services/education/question-service/question.service';
import { Injectable } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExamResolver implements Resolve<ChooseQuestionAddModel[]> {



    constructor(private questionService: QuestionService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ChooseQuestionAddModel[]> {

        return this.questionService.getExamChooseQuestions(+ route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}