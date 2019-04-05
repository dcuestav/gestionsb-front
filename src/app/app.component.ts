import { SpinnerService } from './service/spinner.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './service/responsive.service';
import { MatSnackBar } from '@angular/material';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'gestionSB';

  private roles: string[];
  private authority: string;

  isLoggedIn = false;
  showStock = false;
  showQuotes = false;

  spinner$: Observable<boolean>;

  constructor(private tokenStorage: TokenStorageService,
              private responsiveService: ResponsiveService,
              private errorService: NotificationService,
              private spinnerService: SpinnerService,
              private router: Router,
              private snackBar: MatSnackBar
    ) {

      this.errorService.notification.subscribe( message => {
        this.snackBar.open(message);
      });

      this.spinner$ = this.spinnerService.getSpinnerObs();
  }

  ngOnInit() {
    this.refreshAuth();
    this.tokenStorage.tokenChange$.subscribe( () => this.refreshAuth() );
  }

  private refreshAuth() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.isLoggedIn = true;
      this.showStock = this.roles.some( role => role === 'ROLE_ADMIN' || role === 'ROLE_STOCK');
      this.showQuotes = this.roles.some( role => role === 'ROLE_ADMIN' || role === 'ROLE_QUOTES');
    } else {
      this.isLoggedIn = false;
      this.showStock = false;
      this.showQuotes = false;
      this.router.navigate(['/login']);
    }
  }

  public isMobile() {
    return this.responsiveService.isMobile();
  }

  logout() {
    this.tokenStorage.signOut();
  }

}
