import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private mobileWidth = 600;
  private windowWidth = window.innerWidth;

  constructor() { }

  public isMobile() {
    return this.windowWidth <= this.mobileWidth;
  }

}
