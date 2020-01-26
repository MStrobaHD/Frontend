import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/core/services/education/question-service/question.service';
import { QuestionAddModel } from 'src/app/core/models/education/question/question-add.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChooseQuestionAddModel } from 'src/app/core/models/education/question/choose-question-add.model';
import { ChooseQuestionDraftModel } from 'src/app/core/models/education/question/choose-question-draft.model';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { ExamResultAddModel } from 'src/app/core/models/education/result/exam-result-add.model';
import { ExamService } from 'src/app/core/services/education/exam-service/exam.service';
import { ExamModel } from 'src/app/core/models/education/exam/exam.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  BAR_RATIO = 100;
  

  isDisabled: string;

  firstOption = 'e0e0e0';
  secondOption = 'e0e0e0';
  thirdOption = 'e0e0e0';
  fourthOption = 'e0e0e0';
  selectedOption: number;

  active = '#00e676';
  notActive = '#f5f5f5';

  questionIterator = 0; // iterator over questions list
  nextQuestionButtonPrevent = false; // disabled button nastepne pytanie before selecting option
  isExamResultVisible = false; // indicator that switch beetween exam result panel and examing panel

  questionPointer: string; // which question is selected

  flag = false;
  afterFirstClick = false;
  answersTemporaryDraft: ChooseQuestionDraftModel[] = []; // draft for temporary usage
  answersForSubmitDraft: ChooseQuestionDraftModel[]; // draft for submit to database

  answersArray: Array<number>;
  questionAmount: number; // helper for top badge
  questionTopIterator = 0; // helper for top badge

  questionList: number[] = [];
  questionsPreparedForExam: Array<ChooseQuestionAddModel>;
  questionObject: ChooseQuestionDraftModel;
  questions: ChooseQuestionAddModel[];

  timeLeft = 15;
  timeForProgresBar = 0;
  convertedTime: number;
  interval;

  // Exam result params -> showing and saving after exam end
  answered: number;
  points: number;
  mark: string;
  isPassed: boolean;
  markWritten: string;
  percentage: number;
  examId: number;
  // -----
  //mark: string;
   positiveQuestion = 0;
   negativeQuestion = 0;
   markRatio: number;
   temporaryMark: string;
   resultObject: ExamResultAddModel;
   exam: ExamModel;



  constructor(
    private questionService: QuestionService,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.exam = this.route.snapshot.data.examProperties;
    this.timeLeft = this.exam.timeForSolve * 60;
    this.route.params.subscribe(params => {
      console.log(+params.id);
      this.examId = +params.id;
   });
    this.convertedTime = this.convertTimeForProgressBar(this.timeLeft);
    this.questions = this.route.snapshot.data.exam;
    this.questionAmount = this.questions.length;
    console.log(this.questionAmount);
    this.startTimer();
    while (this.questionTopIterator < this.questionAmount) {
      this.questionList.push(this.questionTopIterator);
      this.questionTopIterator++;
    }
  }
  
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timeForProgresBar = this.timeForProgresBar + this.convertedTime;
      } else if (this.timeLeft === 0) {
        this.finishExam();
        console.log('koniec czasu');
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
  markSelectedAnswers(option: number) {
    if (this.answersTemporaryDraft[this.questionIterator] != null) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
      if (option === 1) {
        this.firstOption = '#00e676';
      } else if (option === 2) {
        this.secondOption = '#00e676';
      } else if (option === 3) {
        this.thirdOption = '#00e676';
      } else if (option === 4) {
        this.fourthOption = '#00e676';
      }
    } else if (this.answersTemporaryDraft[this.questionIterator] == null) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
    }
  }
  nextQuestion() {
    if (this.questionIterator < this.questions.length - 1) {
      this.questionIterator++;
      this.nextQuestionButtonPrevent = false;
      if (this.answersTemporaryDraft[this.questionIterator] != null) {
        this.markSelectedAnswers(
          this.answersTemporaryDraft[this.questionIterator].optionSelected
        );
      }
    } else {
      this.isExamResultVisible = true;
      this.nextQuestionButtonPrevent = false;
    }
  }
  previousQuestion() {
    if (this.questionIterator > 0) {
      this.questionIterator--;
      this.markSelectedAnswers(
        this.answersTemporaryDraft[this.questionIterator].optionSelected
      );
    }
  }
  goToResult() {
    this.router.navigate(['/user']);
  }
  setAsMarked() {
    this.afterFirstClick = true;
    console.log(
      this.questionPointer,
      '===',
      this.questions[this.questionIterator].correctAnswer
    );
    if (this.answersTemporaryDraft.length !== 0) {
      if (this.answersTemporaryDraft[this.questionIterator] != null) {
        this.flag = true;
        this.answersTemporaryDraft[
          this.questionIterator
        ].answer = this.questionPointer;
        this.answersTemporaryDraft[
          this.questionIterator
        ].optionSelected = this.selectedOption;
        if (
          this.answersTemporaryDraft[this.questionIterator].answer ===
          this.questions[this.questionIterator].correctAnswer
        ) {
          this.answersTemporaryDraft[this.questionIterator].isTrue = true;
        } else {
          this.answersTemporaryDraft[this.questionIterator].isTrue = false;
        }
      }
    }
    if (
      this.questionPointer ===
        this.questions[this.questionIterator].correctAnswer &&
      this.flag === false
    ) {
      this.questionObject = {
        id: this.questionIterator,
        answer: this.questionPointer,
        isTrue: true,
        optionSelected: this.selectedOption
      };

      this.answersTemporaryDraft.push(this.questionObject);
    } else if (
      this.questionPointer !==
        this.questions[this.questionIterator].correctAnswer &&
      this.flag === false
    ) {
      this.questionObject = {
        id: this.questionIterator,
        answer: this.questionPointer,
        isTrue: false,
        optionSelected: this.selectedOption
      };
      this.answersTemporaryDraft.push(this.questionObject);
    }
    this.flag = false;
    if (this.questionIterator < this.questions.length - 1) {
      this.questionIterator++;
    }

    console.log(this.answersTemporaryDraft);
    if (this.questionIterator < this.questions.length) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
    }
  }
  openQuestion(questionNumber: number) {
    this.questionIterator = questionNumber;
    this.markSelectedAnswers(
      this.answersTemporaryDraft[this.questionIterator].optionSelected
    );
    console.log(this.questionIterator);
  }
  finishExam() {
    this.pauseTimer();
    this.isExamResultVisible = true;
    const numberOfQuestion = this.answersTemporaryDraft.length;

    // get mark
    this.answersTemporaryDraft.forEach(element => {
      if(element.isTrue === true){
        this.positiveQuestion++;
      }
    });
    this.answersTemporaryDraft.forEach(element => {
      if(element.isTrue === false){
        this.negativeQuestion++;
      }
    });
    this.markRatio = this.positiveQuestion / numberOfQuestion;
    this.mark = this.calculateMark(this.markRatio);
    // console.log(this.mark);
    // console.log(this.positiveQuestion);
    const userid = + localStorage.getItem('userID');
    // console.log('userId' + userid);
    // console.log('examId' + this.examId);
    // Save result
    this.resultObject = {
      mark: this.mark,
      points: this.positiveQuestion,
      maxPoints: this.exam.numberOfQuestion,
      percentage: (this.positiveQuestion / this.exam.numberOfQuestion) * 100,
      examId: this.examId,
      userId: userid
    };

    this.percentage = this.positiveQuestion / this.exam.numberOfQuestion;
    this.answered = this.positiveQuestion + this.negativeQuestion;

    if (this.mark === 'Bardzo dobry' || this.mark === 'Dobry' || this.mark === 'Dostateczny') {
      this.isPassed = true;
    } else {
      this.isPassed = false;
    }

    this.examService.saveResult(this.resultObject).subscribe(
      response => {
        console.log(response);
        this.alertifyService.success('Zapisano wynik');
      },
      error => {
        console.log(error);
        this.alertifyService.error(error);
      }
    );
  }
  calculateMark(markRatio){
    if(markRatio >= 0.9){
      this.temporaryMark = 'Bardzo dobry';
      return this.temporaryMark;
    } else if(markRatio >= 0.7) {
      this.temporaryMark = 'Dobry';
      return this.temporaryMark;
    } else if(markRatio >= 0.5) {
      this.temporaryMark = 'Dostateczny';
      return this.temporaryMark;
    } else {
      this.temporaryMark = 'Niezaliczone';
      return this.temporaryMark;
    }
  }
  select(optionNumber: number, option: string, iterator: number) {
    if (optionNumber === 1) {
      this.firstOption = '#00e676';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
      this.nextQuestionButtonPrevent = true;
      this.questionPointer = this.questions[iterator].optionOne;
      this.selectedOption = optionNumber;
    } else if (optionNumber === 2) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#00e676';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
      this.nextQuestionButtonPrevent = true;
      this.questionPointer = this.questions[iterator].optionTwo;
      this.selectedOption = optionNumber;
    } else if (optionNumber === 3) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#00e676';
      this.fourthOption = '#f5f5f5';
      this.nextQuestionButtonPrevent = true;
      this.questionPointer = this.questions[iterator].optionThree;
      this.selectedOption = optionNumber;
    } else {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#00e676';
      this.nextQuestionButtonPrevent = true;
      this.questionPointer = this.questions[iterator].optionFour;
      this.selectedOption = optionNumber;
    }
  }
  getAllQuestions() {}
  getNextQuestion() {}
}
