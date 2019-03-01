import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  public showError(error: any) {
    if (0 === error.status) {
      this.snackBar.open('No hay conexión');
    } else {
      this.snackBar.open('Error desconocido');
    }
  }
}

