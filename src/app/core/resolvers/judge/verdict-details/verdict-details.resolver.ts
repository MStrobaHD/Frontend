import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';
import { VerdictService } from 'src/app/core/services/judge/verdict-service/verdict.service';

@Injectable()
export class VerdictDetailsResolver implements Resolve<VerdictListModel[]> {



    constructor(private verdictService: VerdictService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<VerdictListModel[]> {

        return this.verdictService.getVerdictWithMetrics(+ route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('Wystąpił błąd przy wczytywaniu szczegołów rozwiązania');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
