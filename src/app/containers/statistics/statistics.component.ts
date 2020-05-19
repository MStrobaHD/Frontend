import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router } from '@angular/router';
import {
  UserStatisticsModel,
  MarkStatisticsModel,
  VerdictStatisticsModel,
  AssetStatisticsModel
} from 'src/app/core/models/user/statistic.model';
import { StatisticsService } from 'src/app/core/services/user/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  single: any[];
  verdicts: any[];
  userVerdicts: any[];
  mark: any[];
  userMark: any[];
  userStats: any[]

  multi: any[];
  view: any[] = [500, 200];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Werdykty';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = 'picnic';
  cardColor = '#232837';
  animation = 'true';

  label = 'Lącznie';
  legendTitle = 'Legenda';

  userStatistics: UserStatisticsModel;
  userMarkStatistics: MarkStatisticsModel;
  markStatistics: MarkStatisticsModel;
  userVerdictStatistics: VerdictStatisticsModel;
  verdictStatistics: VerdictStatisticsModel;
  assetStatistics: AssetStatisticsModel;

  constructor(
    private authService: AuthService,
    private statisticsService: StatisticsService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.getAssetStatistics();
    this.getMarkStatistics();
    this.getUserMarkStatistics();
    this.getUserStatistics();
    this.getUserVerdictStatistics();
    this.getVerdictStatistics();

    console.log(this.userStatistics);
    console.log(this.userMarkStatistics);
    console.log(this.markStatistics);
    console.log(this.userVerdictStatistics);
    console.log(this.verdictStatistics);
    console.log(this.assetStatistics);
  }

  isLogged() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getUserStatistics() {
    this.statisticsService.GetUserStatistics().subscribe(result => {
      this.userStatistics = result;
      this.userStats = [
        {
          name: 'Administratorzy',
          value: +this.userStatistics.administratorsNumber
        },
        {
          name: 'Studenci',
          value: +this.userStatistics.studentsNumber
        },
        {
          name: 'Nauczyciele',
          value: +this.userStatistics.teachersNumber
        }
      ];
    });
  }
  getUserMarkStatistics() {
    this.statisticsService
      .GetUserMarkStatistics(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.userMarkStatistics = result;
        this.userMark = [
          {
            name: 'Negative Mark',
            value: +this.userMarkStatistics.negativeMarksNumber
          },
          {
            name: 'Positive Marks',
            value: +this.userMarkStatistics.positiveMarksNumber
          }
        ];
      });
  }
  getMarkStatistics() {
    this.statisticsService.GetMarkStatistics().subscribe(result => {
      this.markStatistics = result;
      this.mark = [
        {
          name: 'Negative Mark',
          value: +this.markStatistics.negativeMarksNumber
        },
        {
          name: 'Positive Marks',
          value: +this.markStatistics.positiveMarksNumber
        }
      ];
    });
  }
  getUserVerdictStatistics() {
    this.statisticsService
      .GetUserVerdictStatistics(+localStorage.getItem('userID'))
      .subscribe(result => {
        this.userVerdictStatistics = result;
        this.userVerdicts = [
          {
            name: 'AC',
            value: +this.userVerdictStatistics.acceptedNumber
          },
          {
            name: 'NAC',
            value: +this.userVerdictStatistics.notAcceptedNumber
          },
          {
            name: 'CE',
            value: +this.userVerdictStatistics.compilationErrorNumber
          },
          {
            name: 'LOCE',
            value: +this.userVerdictStatistics.linesOfCodeLimitExceededNumber
          },
          {
            name: 'MLE',
            value: +this.userVerdictStatistics.memoryLimitExceededNumber
          },
          {
            name: 'RE',
            value: +this.userVerdictStatistics.runtimeErrorNumber
          },
          {
            name: 'TLE',
            value: +this.userVerdictStatistics.timeLimitExceededNumber
          }
        ];
      });
  }
  getVerdictStatistics() {
    this.statisticsService.GetVerdictStatistics().subscribe(result => {
      this.verdictStatistics = result;
      this.verdicts = [
        {
          name: 'AC',
          value: +this.verdictStatistics.acceptedNumber
        },
        {
          name: 'NAC',
          value: +this.verdictStatistics.notAcceptedNumber
        },
        {
          name: 'CE',
          value: +this.verdictStatistics.compilationErrorNumber
        },
        {
          name: 'LOCE',
          value: +this.verdictStatistics.linesOfCodeLimitExceededNumber
        },
        {
          name: 'MLE',
          value: +this.verdictStatistics.memoryLimitExceededNumber
        },
        {
          name: 'RE',
          value: +this.verdictStatistics.runtimeErrorNumber
        },
        {
          name: 'TLE',
          value: +this.verdictStatistics.timeLimitExceededNumber
        }
      ];
    });
  }
  getAssetStatistics() {
    this.statisticsService.GetAssetsStatistics().subscribe(result => {
      this.assetStatistics = result;
      console.log(result.lessonNumber);
      this.single = [
        {
          name: 'Algorithms',
          value: +this.assetStatistics.algorithmTasksNumber
        },
        {
          name: 'Courses',
          value: +this.assetStatistics.coursesNumber
        },
        {
          name: 'Exams',
          value: +this.assetStatistics.examsNumber
        },
        {
          name: 'Flashcards',
          value: +this.assetStatistics.flashcardsSetNumber
        },
        {
          name: 'Lesson',
          value: +this.assetStatistics.lessonNumber
        }
      ];
    });
  }
}

export let multi = [
  {
    name: 'Germany',
    series: [
      {
        name: '2010',
        value: 7300000
      },
      {
        name: '2011',
        value: 8940000
      }
    ]
  },

  {
    name: 'USA',
    series: [
      {
        name: '2010',
        value: 7870000
      },
      {
        name: '2011',
        value: 8270000
      }
    ]
  },

  {
    name: 'France',
    series: [
      {
        name: '2010',
        value: 5000002
      },
      {
        name: '2011',
        value: 5800000
      }
    ]
  }
];
