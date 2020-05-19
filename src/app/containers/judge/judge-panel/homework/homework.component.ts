import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { constructor } from 'core-js';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  userForm = new FormControl();
  toppingListForm = new FormControl();

  minDate: Date;
  maxDate: Date;

  algorithmList: any[];
  users: any[];

  constructor(private taskService : AlgorithmTaskService,
              private authService: AuthService,
              private alertifyService: AlertifyService) { 
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.getAlgorithmTask();
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe(result => {
        this.users = result;
        this.alertifyService.success('Data loaded correctly');
      });
  }
  getAlgorithmTask() {
    this.taskService
      .getAlgorithmTaskForListAsync()
      .subscribe(result => {
        this.algorithmList = result;
        this.alertifyService.success('Data loaded correctly');
      });
  }
  display(){
    console.log(this.userForm.value);
  }
}
