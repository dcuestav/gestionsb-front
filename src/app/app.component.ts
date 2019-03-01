import { Component } from '@angular/core';
import { ResponsiveService } from './service/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gestionSB';

  constructor(private responsiveService: ResponsiveService) {
  }

  public isMobile() {
    return this.responsiveService.isMobile();
  }
}
