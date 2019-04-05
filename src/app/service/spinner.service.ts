import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisibility: Subject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public show() {
    Promise.resolve(null).then(() => this.spinnerVisibility.next(true));
  }

  public hide() {
    Promise.resolve(null).then(() => this.spinnerVisibility.next(false));
  }

  public getSpinnerObs() {
    return this.spinnerVisibility;
  }
}
