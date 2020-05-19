import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { UserListModel } from 'src/app/core/models/user/userlist.model';

@Component({
  selector: 'app-priviliges-management',
  templateUrl: './priviliges-management.component.html',
  styleUrls: ['./priviliges-management.component.scss']
})
export class PriviligesManagementComponent implements OnInit {
  role: string;
  user: any;
  isMany = false;
  displayedColumns: string[] = ['select', 'username', 'email', 'role'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  users: UserListModel[];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateRole() {
    if (this.isMany === false) {
      this.user.role = this.role;
      this.authService.updateUserRole(this.user).subscribe(
        response => {
          this.alertifyService.success(
            'Zaaktualizowano role pojeńdyńczego użytkownika'
          );
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    } else {
      this.users.forEach(user => {
        user.role = this.role;
      });
      this.authService.updateUserGroupRole(this.users).subscribe(
        response => {
          this.alertifyService.success(
            'Zaaktualizowano role wielu użytkowników'
          );
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  checkifMany(){
    if (this.isAllSelected()) {
      this.isMany = true;
    }
  }
  markUser(event) {
    this.isMany = false;
    this.user = event;

    return `${
      this.selection.isSelected(event) ? 'deselect' : 'select'
    } row ${this.checkifMany()}`;
  }
  markAllUsers() {
    this.isMany = true;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getUsersList() {
    this.authService.getUsers().subscribe(
      result => {
        this.users = result;
        this.dataSource = new MatTableDataSource(this.users);
        this.alertifyService.success('Lista uzytkowników załadowana');
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }
}
