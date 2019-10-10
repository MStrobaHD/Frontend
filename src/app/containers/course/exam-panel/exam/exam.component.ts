import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  isDisabled: string;

  firstOption = 'e0e0e0';
  secondOption = 'e0e0e0';
  thirdOption = 'e0e0e0';
  fourthOption = 'e0e0e0';

  questionList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {}

  ngOnInit() {}

  select(option: number) {
    if (option === 1) {
      this.firstOption = '#00e676';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';

    } else if (option === 2) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#00e676';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#f5f5f5';
    } else if (option === 3) {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#00e676';
      this.fourthOption = '#f5f5f5';
    } else {
      this.firstOption = '#f5f5f5';
      this.secondOption = '#f5f5f5';
      this.thirdOption = '#f5f5f5';
      this.fourthOption = '#00e676';
    }
  }
}
