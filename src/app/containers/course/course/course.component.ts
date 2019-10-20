import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';
import { CategoryService } from 'src/app/core/services/common/category/category.service';
import { CategoryModel } from 'src/app/core/models/common/category/category.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  isVisibleCourseForm = false;
  displayedColumns: string[] = [
    'courseIconUrl',
    'progress',
    'name',
    'description',
    'date',
    'action'
  ];

  addCourseForm: FormGroup;
  addCourseObject: CourseAddModel;

  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();

  courses: CourseModel[];
  categories: CategoryModel[];

  selected = 0;
  hovered = 0;
  readonly = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createAddCourseForm();
    this.getCourses();
    this.getCategories();
  }
  createAddCourseForm() {
    this.addCourseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseIconUrl: ['', Validators.required],
      description: ['', Validators.required],
      userId: [1, Validators.required],
      categoryId: [1, Validators.required]
    });
  }
  getCourses() {
    this.courseService.getCourses().subscribe(result => {
      this.courses = result;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alertify.success('Data loaded correctly');
    });
  }
  addCourse() {
    if (this.addCourseForm.valid) {
      this.addCourseObject = Object.assign({}, this.addCourseForm.value);
      this.courseService.addCourse(this.addCourseObject).subscribe(
        () => {
          this.ngOnInit();
          this.alertify.success('Course was added');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  calculateProgress() {
    // get lessons
    // get completed lessons
    // calculate progress
    // return progress
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openCourse(course) {
    this.router.navigate(['/courses/course_panel']);
  }
  editCourse(course) {
    this.router.navigate(['/courses/course_edition_panel']);
  }
  showCourseForm() {
    this.isVisibleCourseForm = true;
  }
  deleteCourse(course) {
    this.courseService.deleteCourse(course.id).subscribe(
      () => {
        this.alertify.success('Course was deleted');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertify.error(error);
      }
    );

  }
  closeCourse() {
    this.isVisibleCourseForm = false;
  }
}
