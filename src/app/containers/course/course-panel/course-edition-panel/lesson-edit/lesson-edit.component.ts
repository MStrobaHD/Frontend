import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit {
  addLessonForm: FormGroup;
  addLessonObject: CourseAddModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createAddCourseForm();
  }
  addCourse() {

  }
  createAddCourseForm() {
    this.addLessonForm = this.fb.group({
      lessonName: [''],
      serverAssetId: [],
      cloudAssetId: [],
      courseId: []
    });
  }
}
