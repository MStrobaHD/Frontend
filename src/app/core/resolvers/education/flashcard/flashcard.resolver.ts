import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { FlashcardSet } from 'src/app/core/models/education/flashcard/flashcardSet.model';
import { Flashcard } from 'src/app/core/models/education/flashcard/flashcard.model';

@Injectable()
export class FlashcardSetResolver implements Resolve<FlashcardSet[]> {



    constructor(private flashcardService: FlashcardService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<FlashcardSet[]> {
        return this.flashcardService.getFlashcardSetsOfCourse(+ route.paramMap.get('courseId')).pipe(
            catchError(error => {
                console.log(+ route.paramMap.get('courseId'));
                this.alertify.error('Wystąpił problem podczas ładowania danych');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class FlashcardListSetResolver implements Resolve<Flashcard[]> {



    constructor(private flashcardService: FlashcardService,
                private router: Router,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Flashcard[]> {

        console.log(+ route.paramMap.get('cardId'));
        return this.flashcardService.getFlashcardListBetterMapping(+ route.paramMap.get('cardId')).pipe(
            catchError(error => {
                console.log(+ route.paramMap.get('cardId'));
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}