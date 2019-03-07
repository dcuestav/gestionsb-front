import { NotificationService } from 'src/app/service/notification.service';
import { Component } from '@angular/core';
import { ResponsiveService } from './service/responsive.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gestionSB';

  constructor(private responsiveService: ResponsiveService,
              private errorService: NotificationService,
              private snackBar: MatSnackBar
    ) {

      this.errorService.notification.subscribe( message => {
        this.snackBar.open(message);
      });
  }

  public isMobile() {
    return this.responsiveService.isMobile();
  }
}
