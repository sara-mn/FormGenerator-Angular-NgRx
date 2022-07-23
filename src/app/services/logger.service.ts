import {Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig, MatSnackBarRef
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 3000,
    data: {}
  }
  snackBarRef: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) {
  }

  show(message: string, action?: string , config: MatSnackBarConfig = this.snackBarConfig) {
    this.snackBarRef = this.snackBar.open(message, action, config);
  }

  hide() {
    this.snackBarRef.dismiss();
  }

  afterHide(act: () => void) {
    this.snackBarRef.afterDismissed().subscribe(() => act);
  }

  onAction(act: () => void) {
    this.snackBarRef.onAction().subscribe(() => act);
  }

  error(message: string) {
    this.snackBarRef = this.snackBar.open(message);
  }

  success() {
    this.snackBarRef = this.snackBar.open('success');
  }
}
