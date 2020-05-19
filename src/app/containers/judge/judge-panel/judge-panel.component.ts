import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestrictionsAddModel } from 'src/app/core/models/judge/restrictions.model';
import { VerificationDataAddModel } from 'src/app/core/models/judge/verification-data-add.model';
import { AlgorithmTaskAddModel } from 'src/app/core/models/judge/algorithm-task-add.model';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { LevelModel } from 'src/app/core/models/judge/level.model';
import { AlgorithmCategoryModel } from 'src/app/core/models/judge/algorithm-category.model';
import { ComplexityModel } from 'src/app/core/models/judge/complexity.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-judge-panel',
  templateUrl: './judge-panel.component.html',
  styleUrls: ['./judge-panel.component.scss']
})
export class JudgePanelComponent implements OnInit {
  isVisibleCourseForm = false;
  examTypeSelector: number;
  step = 0;
  selected = 0;
  hovered = 0;
  readonly = false;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  restrictionAddForm: FormGroup;
  restrictionAddObject: RestrictionsAddModel;

  verificationDataAddForm: FormGroup;
  verificationDataAddObject: VerificationDataAddModel;

  algorithmTaskAddForm: FormGroup;
  algorithmTaskAddObject: AlgorithmTaskAddModel;

  // for select purpose
  levels: LevelModel;
  categories: AlgorithmCategoryModel;
  complexities: ComplexityModel;

  // helpers
    algorithmTaskId: string;
  verificationId: number;

  constructor(
    private formBuilder: FormBuilder,
    private algorithmTaskService: AlgorithmTaskService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.createAddAlgorithmTaskForm();
    this.createAddRestrictionForm();
    this.createAddVerificationDataForm();
    this.getLevels();
    this.getAlgorithmCategories();
    this.getComplexities();

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createAddAlgorithmTaskForm() {
    this.algorithmTaskAddForm = this.formBuilder.group({
      algorithmTaskName: [''],
      description: [''],
      userId: [+localStorage.getItem('userID')],
      complexityId: [],
      algorithmCategoryId: [],
      levelId: [],
      timeLimit: [],
      memoryLimit: [],
      elementaryOperationLimit: [],
      linesOfCodeLimit: [],
      timeToSolve: [],
      complexityOrder: []
    });
  }
  createAddRestrictionForm() {
    this.restrictionAddForm = this.formBuilder.group({
      timeLimit: [],
      memoryLimit: [],
      elementaryOperationLimit: [],
      linesOfCodeLimit: [],
      timeToSolve: [],
      complexityOrder: []
    });
  }
  createAddVerificationDataForm() {
    this.verificationDataAddForm = this.formBuilder.group({
      inputData: [''],
      outputData: [''],
      algorithmTaskId: [this.algorithmTaskId]
    });
  }
  getLevels() {
    this.algorithmTaskService
      .getLevels()
      .subscribe(result => {
        this.levels = result;
        // this.alertifyService.success('Załadowano Poziomy Trudności');
      });
  }
  getAlgorithmCategories() {
    this.algorithmTaskService
      .getAlgortihmCategories()
      .subscribe(result => {
        this.categories = result;
        // this.alertifyService.success('Załadowano Dostępne Kategorie');
      });
  }
  getComplexities() {
    this.algorithmTaskService
      .getComplexities()
      .subscribe(result => {
        this.complexities = result;
        // this.alertifyService.success('Załadowano Złożoności');
      });
  }

  addRestriction() {
      if (this.restrictionAddForm.valid) {
        this.restrictionAddObject = Object.assign({}, this.restrictionAddForm.value);
        this.algorithmTaskService.addRestriction(this.restrictionAddObject)
          .subscribe(result => {
            //this.restrictionId = + result;
            this.alertifyService.success('Ograniczenia zostały dodane');
          },
          error => {
            this.alertifyService.error(error);
          }
        );
      }
  }

    addVerificationData() {
      if (this.verificationDataAddForm.valid) {
        this.verificationDataAddObject = Object.assign({}, this.verificationDataAddForm.value);
        this.verificationDataAddObject.algorithmTaskId = + localStorage.getItem('algorithmTaskId');
        this.algorithmTaskService.addVerificationData(this.verificationDataAddObject).subscribe(result => {
        this.alertifyService.success('Dane testowe zostały dodane');
        },
          error => {
            this.alertifyService.error(error);
          }
        );
      }
  }
  addAlgorithmTaskData() {
    if (this.algorithmTaskAddForm.valid) {
      this.algorithmTaskAddObject = Object.assign({}, this.algorithmTaskAddForm.value);
      this.algorithmTaskService.addAlgorithm(this.algorithmTaskAddObject).subscribe(result => {
          this.algorithmTaskId =  String(result);
          localStorage.setItem('algorithmTaskId', this.algorithmTaskId);
          this.alertifyService.success('Algorytm został dodany');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
}
  showAlgorithmForm() {
    this.isVisibleCourseForm = true;
    this.step = 1;
  }

  closeAlgorithmForm() {
    this.isVisibleCourseForm = false;
    this.step = 0;
  }
}
