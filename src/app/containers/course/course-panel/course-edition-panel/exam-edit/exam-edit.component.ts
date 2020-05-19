import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionAddModel } from 'src/app/core/models/education/question/question-add.model';
import { ExamAddModel } from 'src/app/core/models/education/exam/examAdd.model';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ChooseQuestionAddModel } from 'src/app/core/models/education/question/choose-question-add.model';
import { DragDropAddModel } from 'src/app/core/models/education/question/drag-drop-add-model';
import { QuestionService } from 'src/app/core/services/education/question-service/question.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
  examTypeSelector = 1;

  isLinear = false;

  ExamAddForm: FormGroup;
  ExamAddObject: ExamAddModel;
  examId: number;

  questionAddForm: FormGroup;
  questionAddObject: QuestionAddModel;

  questionModel: any = {};
  chooseQuestionModel: any = {};
  dragDropModel: any = {};

  examItemsLimit: number;
  examItemsCounter = 0;

  chooseQuestionAddForm: FormGroup;
  chooseQuestionAddObject: ChooseQuestionAddModel;
  correct: string;

  dragDropAddForm: FormGroup;
  dragDropAddObject: DragDropAddModel;
  courseId: number;

  questionList: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private questionService: QuestionService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = +params.courseId;
   });
    this.createAddExamForm();
    this.createAddQuestionForm();
    this.createAddChooseQuestionForm();
    this.createAddDragDropForm();
  }

  createAddExamForm() {
    this.ExamAddForm = this.formBuilder.group({
      examName: [''],
      numberOfQuestion: [''],
      timeForSolve: [''],
      examType: [''],
      courseId: [this.courseId]
    });
  }
  createAddQuestionForm() {
    this.questionAddForm = this.formBuilder.group({
      questionContent: [''],
      answer: [''],
      examId: [this.examId]
    });
  }
  createAddChooseQuestionForm() {
    this.chooseQuestionAddForm = this.formBuilder.group({
      question: [''],
      correctAnswer: [''],
      optionOne: [''],
      optionTwo: [''],
      optionThree: [''],
      examId: [this.examId]
    });
  }
  createAddDragDropForm() {
    this.dragDropAddForm = this.formBuilder.group({
      content: [''],
      blockPosition: [],
      examId: [this.examId]
    });
  }
  addExam() {
    if (this.ExamAddForm.valid) {
      this.ExamAddObject = Object.assign({}, this.ExamAddForm.value);
      this.examService.addExam(this.ExamAddObject).subscribe(
        response => {
          this.examId = +response;
          this.alertifyService.success('Egzamin został utworzony');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  addQuestion() {
    if (this.examItemsCounter < this.examItemsLimit) {
      this.questionModel.examId = this.examId;
      this.questionService.addQuestion(this.questionModel).subscribe(
        response => {
          this.examItemsCounter++;
          this.questionList.push(this.examItemsCounter);
          this.alertifyService.success('Pytanie zostało dodane');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    } else {
      this.alertifyService.message('Dodano już wszystkie pytania');
    }
  }
  addChooseQuestion() {
    if (this.examItemsCounter < this.examItemsLimit) {
      this.chooseQuestionModel.examId = this.examId;
      this.questionService.addChooseQuestion(this.chooseQuestionModel).subscribe(
        response => {
          this.examItemsCounter++;
          this.questionList.push(this.examItemsCounter);
          this.alertifyService.success('Pytanie zostało dodane');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    } else {
      this.alertifyService.message('Dodano już wszystkie pytania');
    }
  }
  addDragDrop() {
  // this.blocksList.push(this.dragDropModel);


    if (this.examItemsCounter < this.examItemsLimit) {
      this.dragDropModel.examId = this.examId;
      this.questionService.addDragDrop(this.dragDropModel).subscribe(
        response => {
          this.examItemsCounter++;
          this.questionList.push(this.examItemsCounter);
          this.alertifyService.success('Blok został dodany');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    } else {
      this.alertifyService.message('Dodano już wszystkie bloki');
    }
  }
}
