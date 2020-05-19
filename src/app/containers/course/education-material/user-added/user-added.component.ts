import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { CloudAssetModel } from 'src/app/core/models/user/cloud-asset.model';


@Component({
  selector: 'app-user-added',
  templateUrl: './user-added.component.html',
  styleUrls: ['./user-added.component.scss']
})
export class UserAddedComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<CloudAssetModel>;
  cloudAssets: CloudAssetModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
