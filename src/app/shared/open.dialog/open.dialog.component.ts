import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Observer } from 'rxjs';
import {ComponentType} from "../grid/grid-types";
import {Dialog} from "./types";
import {CanComponentDeactivate} from "../../services/guard/types";

@Component({
  selector: 'app-open.dialog',
  templateUrl: './open.dialog.component.html',
  styleUrls: ['./open.dialog.component.scss']
})
export class OpenDialogComponent implements CanComponentDeactivate{

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe({
      next: (result: Dialog<any>) => {
        this.showDialog<ComponentType<any>>(result?.component , {...result?.config , id:this.route.snapshot.params['id']});
      }
    } as Observer<any>)
  }

  showDialog<T>(component: ComponentType<T>,data?:any){
    const dialogRef = this.dialog.open(component, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next:() => {
        this.router.navigate(['.'], { relativeTo: this.route.parent });
      }
    } as Observer<void>)
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true
  }
}
