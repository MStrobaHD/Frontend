import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { LessonService } from 'src/app/core/services/education/lesson-service/lesson.service';

@Injectable()
export class LessonPanelResolver implements Resolve<LessonModel[]> {

    constructor(private lessonService: LessonService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<LessonModel[]> {

        return this.lessonService.getCourseLessons(+ route.paramMap.get('courseId')).pipe(
            catchError(error => {
                this.alertify.error('Błąd podczas wczytywania listy lekcji');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}