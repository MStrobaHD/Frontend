import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';

@Injectable({
  providedIn: 'root'
})

export class VerdictService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getVerdictDetails(verdictId: number) {
    return this.http.get<VerdictListModel[]>(this.baseUrl + 'verdict/details/'+ verdictId);
  }
}

