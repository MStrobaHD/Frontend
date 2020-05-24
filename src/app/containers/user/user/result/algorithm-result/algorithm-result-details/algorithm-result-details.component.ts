import { Component, OnInit } from '@angular/core';
import { VerdictService } from 'src/app/core/services/judge/verdict-service/verdict.service';
import { ActivatedRoute } from '@angular/router';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-algorithm-result-details',
  templateUrl: './algorithm-result-details.component.html',
  styleUrls: ['./algorithm-result-details.component.scss']
})
export class AlgorithmResultDetailsComponent implements OnInit {

  verdict: VerdictListModel;
  editorOptions = {
    theme: 'vs',
    language: 'csharp',
    contextmenu: 'true',
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true',
    readOnly: true
  };
  consoleOptions = {};

  public code;
  input = '';
  constructor(private verdictService: VerdictService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.verdict = this.route.snapshot.data.verdict;
  }
  return() {
    this.location.back();
  }
  // getVerdicts() {
  //   this.verdictService
  //     .getVerdictsForList(+localStorage.getItem('userID'))
  //     .subscribe(result => {
  //       this.verdict = result;
  //       this.dataSource = new MatTableDataSource(this.verdict);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.alertify.success('Lista werdyktów została wczytana');
  //     });
  // }
}
