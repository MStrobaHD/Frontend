import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import {
  GroupAddModel,
  GroupModel,
  STGAssigment,
  CTGAssigment,
  TTGAssigment
} from 'src/app/core/models/education/group/group.model';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-group-panel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.scss']
})
export class GroupPanelComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  isShowed = false;

  showGroupCreationForm = false;
  showAssignmentForm = false;
  showTaskAssignmentForm = false;
  showStudentToGroupAssignmentForm = false;

  userForm = new FormControl();
  toppingListForm = new FormControl();

  addGroupForm: FormGroup;
  addGroupObject: GroupAddModel;

  stgAssignmentForm: FormGroup;
  stgAssignmentObject: STGAssigment;
  ctgAssignmentForm: FormGroup;
  ctgAssignmentObject: CTGAssigment;
  ttgAssignmentForm: FormGroup;
  ttgAssignmentObject: TTGAssigment;

  minDate: Date;
  maxDate: Date;

  groupList: GroupModel[];
  coursesList: CourseModel[];
  algorithmList: any[];
  users: any[];
  filteredUserList: any[] = [];

  role: string;

  constructor(
    private taskService: AlgorithmTaskService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private groupService: GroupService,
    private courseService: CourseService,
    private location: Location
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.createAddGroupForm();
    this.createSTGAssigmentForm();
    this.createCTGAssigmentForm();
    this.createTTGAssigmentForm();
    this.getAlgorithmTask();
    this.getUsers();
    this.getGroups();
    this.getCourses();
    console.log(this.toppingListForm);
    this.role = localStorage.getItem('role');
  }
  return() {
    this.location.back();
  }
  checkErrorAddGroupForm = (controlName: string, errorName: string) => {
    return this.addGroupForm.controls[controlName].hasError(errorName);
  }
  checkErrorStgAssignmentForm = (controlName: string, errorName: string) => {
    return this.stgAssignmentForm.controls[controlName].hasError(errorName);
  }
  checkErrorCtgAssignmentForm = (controlName: string, errorName: string) => {
    return this.ctgAssignmentForm.controls[controlName].hasError(errorName);
  }
  checkErrorTtgAssignmentForm = (controlName: string, errorName: string) => {
    return this.ttgAssignmentForm.controls[controlName].hasError(errorName);
  }
  createAddGroupForm() {
    this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupType: ['', Validators.required],
      teacherId: [+localStorage.getItem('userID'), Validators.required]
    });
  }
  createSTGAssigmentForm() {
    this.stgAssignmentForm = this.fb.group({
      groupIds: [, Validators.required],
      studentIds: [, Validators.required]
    });
  }
  createCTGAssigmentForm() {
    this.ctgAssignmentForm = this.fb.group({
      courseIds: [, Validators.required],
      groupIds: [, Validators.required]
    });
  }
  createTTGAssigmentForm() {
    this.ttgAssignmentForm = this.fb.group({
      algorithmTaskIds: [, Validators.required],
      groupIds: [, Validators.required]
    });
  }
  addGroup() {
    if (this.addGroupForm.valid) {
      this.addGroupObject = Object.assign({}, this.addGroupForm.value);
      this.groupService.addGroup(this.addGroupObject).subscribe(
        () => {
          this.alertifyService.success('Grupa została utworzona');
          this.ngOnInit();
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
    this.showContent(5);
  }
  AssignSTG() {
    if (this.stgAssignmentForm.valid) {
      this.stgAssignmentObject = Object.assign(
        {},
        this.stgAssignmentForm.value
      );
      this.groupService
        .AssignManyStudentsToManyGroup(this.stgAssignmentObject)
        .subscribe(
          () => {
            this.alertifyService.success('Studenci zostali przypisany do grup');
            this.ngOnInit();
          },
          error => {
            this.alertifyService.error(error);
          }
        );
    }
    this.showContent(5);
  }
  AssignCTG() {
    if (this.ctgAssignmentForm.valid) {
      this.ctgAssignmentObject = Object.assign(
        {},
        this.ctgAssignmentForm.value
      );
      this.groupService
        .AssignManyCoursesToManyGroup(this.ctgAssignmentObject)
        .subscribe(
          () => {
            this.alertifyService.success('Kursy zostały przypisane do grup');
            this.ngOnInit();
          },
          error => {
            this.alertifyService.error(error);
          }
        );
    }
    this.showContent(5);
  }
  AssignTTG() {
    if (this.ttgAssignmentForm.valid) {
      this.ttgAssignmentObject = Object.assign(
        {},
        this.ttgAssignmentForm.value
      );
      this.groupService
        .AssignManyTasksToManyGroup(this.ttgAssignmentObject)
        .subscribe(
          () => {
            this.alertifyService.success('Zadania zostały przypisane do grup');
            this.ngOnInit();
          },
          error => {
            this.alertifyService.error(error);
          }
        );
    }
    this.showContent(5);
  }
  showAssigmentForm() {
    this.isShowed = true;
  }
  closeAssignmentForm() {
    this.isShowed = false;
  }
  getUsers() {
    this.authService.getUsers().subscribe(result => {
      this.users = result;
      this.users = this.users.filter(item => item.role === 'Student');
    });
  }
  getGroups() {
    this.groupService.getGroups().subscribe(result => {
      this.groupList = result;
    });
  }
  getAlgorithmTask() {
    this.taskService.getAlgorithmTaskForListAsync().subscribe(result => {
      this.algorithmList = result;
    });
  }
  getCourses() {
    this.courseService
      .getCreatedCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.coursesList = result;
      });
  }
  display() {
    console.log(this.userForm.value);
  }
  showContent(content: number) {
    if (content === 1) {
      this.showGroupCreationForm = true;
      this.step = 1;
    } else {
      this.showGroupCreationForm = false;
      this.step = 1;
    }
    if (content === 2) {
      this.showAssignmentForm = true;
      this.step = 1;
    } else {
      this.showAssignmentForm = false;
      this.step = 1;
    }
    if (content === 3) {
      this.showTaskAssignmentForm = true;
      this.step = 1;
    } else {
      this.showTaskAssignmentForm = false;
      this.step = 1;
    }
    if (content === 4) {
      this.showStudentToGroupAssignmentForm = true;
      this.step = 1;
    } else {
      this.showStudentToGroupAssignmentForm = false;
      this.step = 1;
    }
    if (content === 5) {
      this.showGroupCreationForm = false;
      this.showAssignmentForm = false;
      this.showTaskAssignmentForm = false;
      this.showStudentToGroupAssignmentForm = false;
      this.step = 0;
    }
  }
}
