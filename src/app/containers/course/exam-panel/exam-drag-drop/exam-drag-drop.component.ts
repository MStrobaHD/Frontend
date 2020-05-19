import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { DragDropModel } from 'src/app/core/models/education/exam/dragdrop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamComponent } from '../exam/exam.component';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';
import { ExamResultAddModel } from 'src/app/core/models/education/result/exam-result-add.model';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

@Component({
  selector: 'app-exam-drag-drop',
  templateUrl: './exam-drag-drop.component.html',
  styleUrls: ['./exam-drag-drop.component.scss']
})
export class ExamDragDropComponent implements OnInit {
  BAR_RATIO = 100;

  dragdrop: DragDropModel[] = [];
  diagramElement: DragDropModel[] = [];
  diagramElementCorrectPosition: DragDropModel[] = [];
  diagramScheme = ([] = []);
  examProperties: ExamModel;
  timeleft = 15;
  timeForProgresBar = 0;
  convertedTime: number;
  interval;
  isCorrect: boolean;
  resultObject: ExamResultAddModel;
  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.examProperties = this.route.snapshot.data.examProperties;
    this.timeleft = this.examProperties.timeForSolve * 60;
    this.dragdrop = this.route.snapshot.data.exam;
    this.prepareBlocks(this.dragdrop);
    this.convertedTime = this.convertTimeForProgressBar(this.timeleft);
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeleft > 0) {
        this.timeleft--;
        this.timeForProgresBar = this.timeForProgresBar + this.convertedTime;
      } else if (this.timeleft === 0) {
        this.finishExam();
        this.pauseTimer();
      }
    }, 1000);
  }
  convertTimeForProgressBar(timeInSeconds: number) {
    const ratio = this.BAR_RATIO / timeInSeconds;
    return ratio;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  prepareBlocks(dragdrop: DragDropModel[]) {
    // available element shuffled
    dragdrop.forEach(element => {
      this.diagramElement.push(element);
    });
    this.diagramElement.sort(() => Math.random() - 0.5);

    // correct position element
    dragdrop.forEach(element => {
      this.diagramElementCorrectPosition.push(element);
    });
    this.diagramElementCorrectPosition.sort((a, b) => {
      if (a.blockPosition < b.blockPosition) {
        return -1;
      } else {
        return a.blockPosition > b.blockPosition ? 1 : 0;
      }
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (
      this.diagramElementCorrectPosition.length === this.diagramScheme.length
    ) {
      if (
        this.compare(this.diagramScheme, this.diagramElementCorrectPosition)
      ) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    } else {
      this.isCorrect = false;
    }
  }
  finishExam() {
    const userid = +localStorage.getItem('userID');
    if (this.isCorrect) {
      this.resultObject = {
        mark: 'Bardzo dobry',
        points: this.examProperties.numberOfQuestion,
        maxPoints: this.examProperties.numberOfQuestion,
        examName: this.examProperties.examName,
        percentage: (this.examProperties.numberOfQuestion / this.examProperties.numberOfQuestion) * 100,
        examId: this.examProperties.id,
        userId: userid
      };
    } else {
      this.resultObject = {
        mark: 'Niezaliczone',
        points: 0,
        maxPoints: this.examProperties.numberOfQuestion,
        examName: this.examProperties.examName,
        percentage: 0,
        examId: this.examProperties.id,
        userId: userid
      };
      this.router.navigate(['/home']);
    }

    this.examService.saveResult(this.resultObject).subscribe(
      response => {
        this.alertifyService.success('Zapisano wynik');
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  compare(actual: DragDropModel[], correct: DragDropModel[]) {
    let flag: number;
    for (let index = 0; index < actual.length; index++) {
      if (actual[index] !== correct[index]) {
        flag = 1;
      }
    }
    if (flag !== 1) {
      return true;
    } else {
      return false;
    }
  }
}
