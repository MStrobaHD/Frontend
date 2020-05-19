import { Injectable } from '@angular/core';

import {
  Resolve,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';

import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { FlashcardSet } from 'src/app/core/models/education/flashcard/flashcardSet.model';

@Injectable()
export class FlashcardListResolver implements Resolve<FlashcardSet[]> {
  constructor(
    private flashcardService: FlashcardService,
    private router: Router,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FlashcardSet[]> {
    return this.flashcardService
      .getFlashcardList(+route.paramMap.get('kartId'))
      .pipe(
        catchError(error => {
          console.log(+route.paramMap.get('kartId'));
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
