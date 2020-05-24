import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseAddModel } from 'src/app/core/models/education/course/courseAdd.model';
import { CategoryService } from 'src/app/core/services/common/category/category.service';
import { CategoryModel } from 'src/app/core/models/common/category/category.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';
import { CourseRatingModel } from 'src/app/core/models/education/course/course-rating.model';
import { ConfirmDialogComponent } from 'src/app/shared/layout/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  panelOpenState = false;
  isVisibleCourseForm = false;
  displayedColumns: string[] = [
    'courseIconUrl',
    'name',
    'description',
    'date',
    'action'
  ];
  selected = 0;
  hovered = 0;
  readonly = false;
  rating: CourseRatingModel;
  
  addCourseForm: FormGroup;
  addCourseObject: CourseAddModel;
  step = 0;
  dataSource = new MatTableDataSource();

  courses: CourseModel[];
  enroledCourses: CourseModel[];

  categories: CategoryModel[];
  enlistParamters: EnlistParameter;
  contain: boolean;

  iterator = 0;
  confirm = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private dialog: MatDialog
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
    this.getCategories();
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
      userId: [+localStorage.getItem('userID'), Validators.required],
      categoryId: [, Validators.required]
    });
  }
  getCourses() {
    this.courseService.getCourses(+localStorage.getItem('userID')).subscribe(result => {
      this.courses = result;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getEnroledCourses() {
    this.courseService
      .getEnroledCourses(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.enroledCourses = result;
      });
  }
  checkIfEnlisted(course) {

    this.enroledCourses.some(element => {
      if (element.id === course.id) {
        this.contain = true;
        return true;
      } else {
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
          this.alertify.success('Kurs został dodany');
        },
        error => {
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
  openCardPanel(course) {
    this.router.navigate(['/courses/flashcard-panel/' + course.id]);
  }
  editCourse(course) {
    this.router.navigate(['/courses/course_edition_panel/'  + course.id]);
  }
  deleteCourse(course) {
    this.openConfirmDialog();
    if (this.confirm === true) {
      this.courseService.deleteCourse(course.id).subscribe(
        () => {
          this.alertify.success('Kurs został usuniety');
          this.getCourses();
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
   
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message:
          'Uwaga przesyłaj zadanie do oceny jeśli jesteś pewny rozwiązania. Czy w takim razie chcesz przesłać zadanie ?',
        buttonYes: 'Tak',
        buttonNo: 'Nie'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirm = result;
    });
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
      },
      error => {
        this.alertify.error(error.error);
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
      },
      error => {
        this.alertify.error(error.error);
      }
    );
  }
  closeCourse() {
    this.isVisibleCourseForm = false;
  }
}
