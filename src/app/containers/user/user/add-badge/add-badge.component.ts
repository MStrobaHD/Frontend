import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BadgeAddModel, BadgeModel } from 'src/app/core/models/user/badge.model';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { CategoryModel } from 'src/app/core/models/common/category/category.model';
import { CategoryService } from 'src/app/core/services/common/category/category.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-badge',
  templateUrl: './add-badge.component.html',
  styleUrls: ['./add-badge.component.scss']
})
export class AddBadgeComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  image: string;
  BadgeAddForm: FormGroup;
  BadgeAddObject: BadgeAddModel;
  categories: CategoryModel[];
  dataSource = new MatTableDataSource();
  badges: BadgeModel[];
  displayedColumns: string[] = [
    'imageUrl',
    'badgeName',
    'experiencePoints',
    'description',
    'action'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertifyService: AlertifyService,
              private categoryService: CategoryService) {}

  ngOnInit() {
    this.createAddBadgeForm();
    this.getCategories();
    this.getBadges();
  }
  deleteBadge(row: BadgeModel) {

  }
  getBadges() {
    this.authService.getAllBadges().subscribe(result => {
      this.badges = result;
      this.dataSource = new MatTableDataSource(this.badges);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alertifyService.success('Data loaded correctly');
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createAddBadgeForm() {
    this.BadgeAddForm = this.formBuilder.group({
      badgeName: [''],
      experiencePoints: [],
      description: [''],
      imageUrl: [''],
      categoryId: []
    });
  }
  addBadge() {
    if (this.BadgeAddForm.valid) {
      this.BadgeAddObject = Object.assign({}, this.BadgeAddForm.value);
      this.authService.addBadge(this.BadgeAddObject).subscribe(
        response => {
          this.alertifyService.success('Odznaka została dodana');
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }
}
