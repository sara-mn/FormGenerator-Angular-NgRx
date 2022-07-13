import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Field, Form} from '../form-types';
import {Table} from 'src/app/directives/data-table/table-types';
import {FormService} from "../../../dbManaging/form.service";
import {FormEntryComponent} from "../form-entry/form-entry.component";
import {AsyncSubject, Observable, switchMap, take, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  forms: Form[] = [];
  tableData: Table<Form> = {
    hasFilter: true,
    hasSort: true,
    hasPagination: true,
    addable: true,
    removable: true,
    editable: true,
    columns: [{}]
  };
  formSubject$ = new AsyncSubject<Form[]>();
  fetch$: Observable<Form[]>

  constructor(private formService: FormService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    const formSubscription = this.formService.getAll()
      .subscribe({
        next: (cols: Form[]) => {
          const table = {
            ...this.tableData,
            columns: cols
          };
          this.tableData = table
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('completed!');
          this.changeDetectorRef.detectChanges();  //   because zone change detection not support indexedDB
          formSubscription.unsubscribe();
        }
      });
  }

  updateTableData(columns: Form[]) {
    let k: Table<Form> = {
      ...this.tableData,
      columns
    };
    return k
  }

  addForm() {
    const dialogRef = this.dialog.open(FormEntryComponent, {
      data: this.tableData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetch();
    })
  }

  refreshData() {
    this.fetch();
  }
}
