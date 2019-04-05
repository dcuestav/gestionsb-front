import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisibility: Subject<boolean> = new Subject();

  constructor() { }

  public show() {
    this.spinnerVisibility.next(true);
  }

  public hide() {
    this.spinnerVisibility.next(false);
  }

  public getSpinnerObs() {
    return this.spinnerVisibility;
  }
}
