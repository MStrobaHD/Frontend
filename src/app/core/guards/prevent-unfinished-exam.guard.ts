import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ExamComponent } from 'src/app/containers/course/exam-panel/exam/exam.component';

@Injectable()
export class PreventUnfinishedExam implements CanDeactivate<ExamComponent> {
    canDeactivate(component: ExamComponent) {
        if (component.questions.length !== component.questionIterator) {
            return confirm('Czy na pewno chcesz zakończyć egzamin');
        }
        return true;
    }
}