import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // tslint:disable-next-line:variable-name
  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
  }
}
