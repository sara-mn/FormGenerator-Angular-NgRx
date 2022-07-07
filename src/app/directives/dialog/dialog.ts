import {Injectable, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from 'src/app/directives/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class Dialog implements OnInit {
  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogComponent> ){
  }

  async ngOnInit() {

  }

  open(data: object, config?: MatDialogConfig) {
    const dialogRef = this.dialog.open(DialogComponent, {
      ...config,
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      return result;
    });
  }

  async close() {
    this.dialogRef.close();
  }


}
