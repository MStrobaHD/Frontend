import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  VerdictStatisticsModel,
  UserStatisticsModel,
  MarkStatisticsModel,
  AssetStatisticsModel
} from 'src/app/core/models/user/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetUserStatistics() {
    return this.http.get<UserStatisticsModel>(
      this.baseUrl + 'user/userStats/'
    );
  }
  GetUserMarkStatistics(userId: number) {
    return this.http.get<MarkStatisticsModel>(
      this.baseUrl + 'user/userMarkStats/' + userId
    );
  }
  GetMarkStatistics() {
    return this.http.get<MarkStatisticsModel>(
      this.baseUrl + 'user/markStats/'
    );
  }
  GetUserVerdictStatistics(userId: number) {
    return this.http.get<VerdictStatisticsModel>(
      this.baseUrl + 'user/userVerdictStats/' + userId
    );
  }
  GetVerdictStatistics() {
    return this.http.get<VerdictStatisticsModel>(
      this.baseUrl + 'user/verdictStats/'
    );
  }
  GetAssetsStatistics() {
    return this.http.get<AssetStatisticsModel>(
      this.baseUrl + 'user/assetStats/'
    );
  }
}
