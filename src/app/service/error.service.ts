import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  public showError(error: HttpErrorResponse) {
    if (0 === error.status) {
      this.snackBar.open('No hay conexión');
    } else if (error.message) {
      this.snackBar.open(error.message);
    } else {
      this.snackBar.open('Error desconocido');
    }

    if (error.error) {
      console.error(error.error);
    }
  }
}

