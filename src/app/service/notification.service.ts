import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notification: Subject<string> = new Subject();

  constructor() {}

  public showError(error: HttpErrorResponse) {

    let message = 'Error desconocido';

    if (0 === error.status) {
      message = 'No hay conexión';
    } else if (401 === error.status) {
        message = 'Fallo de autorización';
    } else if (error.message) {
      message = error.message;
    }

    this.notification.next(message);

    if (error.error) {
      console.error(error.error);
    }
  }

  public showInfo(message: string) {
    this.notification.next(message);
  }

}

