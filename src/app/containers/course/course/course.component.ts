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
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';

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
  step = 0;
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();

  courses: CourseModel[];
  enroledCourses: CourseModel[];

  categories: CategoryModel[];
  enlistParamters: EnlistParameter;
  contain: boolean;

  iterator = 0;
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
  ) {
    if (this.courseService.subsVarSecond === undefined) {
      this.courseService.subsVarSecond = this.courseService.invokeSecondComponentFunction.subscribe(
        (name: string) => {
          this.getCourses();
        }
      );
    }
  }

  ngOnInit() {
    
    this.createAddCourseForm();
    // this.getCourses();
    this.getCategories();
    // this.getEnroledCourses();
    this.enroledCourses = this.route.snapshot.data.enroledCourses;
    this.courses = this.route.snapshot.data.courses;
    this.dataSource = new MatTableDataSource(this.courses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.courseService.getCourses(+localStorage.getItem('userID')).subscribe(result => {
      this.courses = result;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alertify.success('Data loaded correctly');
    });
  }
  getEnroledCourses() {
    this.courseService
      .getEnroledCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.enroledCourses = result;
        console.log(result);
        this.alertify.success('Data loaded correctly');
      });
  }
  checkIfEnlisted(course) {
    // if (this.enroledCourses.length > 0) {

    this.enroledCourses.some(element => {
      if (element.id === course.id) {
        console.log(true);
        this.contain = true;
        return true;
      } else {
        console.log(false);
        this.contain = false;
      }
    });

    return this.contain;
  }
  checkIfMyCourse() {
    if (localStorage.getItem('role') === 'Administrator') {
      return true;
    } else {
      return false;
    }
  }
  addCourse() {
    if (this.addCourseForm.valid) {
      this.addCourseObject = Object.assign({}, this.addCourseForm.value);
      this.courseService.addCourse(this.addCourseObject).subscribe(
        () => {
          this.getCourses();
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
    this.router.navigate(['/courses/course_panel/' + course.id]);
  }
  openExamPanel(course) {
    this.router.navigate(['/courses/exampanel/' + course.id]);
  }
  editCourse(course) {
    this.router.navigate(['/courses/course_edition_panel/'  + course.id]);
  }
  showCourseForm() {
    this.isVisibleCourseForm = true;
  }
  enlistCourse(course) {
    this.enlistParamters = {
      userId: +localStorage.getItem('userID'),
      courseId: course.id
    };

    this.courseService.enlistCourse(this.enlistParamters).subscribe(
      () => {
        this.alertify.success('Zostałeś zapisany na kurs');
        this.getCourses();
        this.courseService.onFirstComponentButtonClick();    
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertify.error(error.error);
        console.log(error.error);
      }
    );
  }
  dislistCourse(course) {
    this.enlistParamters = {
      userId: +localStorage.getItem('userID'),
      courseId: course.id
    };

    this.courseService.dislistCourse(this.enlistParamters).subscribe(
      () => {
        this.alertify.success('Zostałeś wypisany z kursu');
        this.getCourses();
        this.courseService.onFirstComponentButtonClick(); 
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertify.error(error.error);
      }
    );
  }

  deleteCourse(course) {
    this.courseService.deleteCourse(course.id).subscribe(
      () => {
        this.alertify.success('Course was deleted');
        this.getCourses();
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
