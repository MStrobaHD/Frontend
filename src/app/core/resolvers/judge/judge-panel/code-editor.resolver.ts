import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';

@Injectable()
export class CodeEditorResolver implements Resolve<AlgorithmTaskListModel[]> {



    constructor(private algorithmTaskService: AlgorithmTaskService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AlgorithmTaskListModel[]> {

        return this.algorithmTaskService.getAlgorithmTaskForSolveAsync(+ route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('Wystąpił błąd podczas ładowania parametrów zadania');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
