import {Component, OnInit} from '@angular/core';
import {Field, Form} from '../form-types';
import {Table} from 'src/app/directives/data-table/table-types';
import {MatDialog} from '@angular/material/dialog';
import {FormService} from "../../../dbManaging/form.service";
import {FormEntryComponent} from "../form-entry/form-entry.component";
import {Observable, take} from "rxjs";

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
    onCloseDialog$: new Observable(),
    getColumns$: new Observable()
  };

  constructor(public dialog: MatDialog,
              private formService: FormService) {
    this.tableData.getColumns$ = this.formService.getAll();
  }

  ngOnInit() {

  }

  addForm(){
    const dialogRef = this.dialog.open(FormEntryComponent, {
      data: this.tableData,
    });
    this.tableData.onCloseDialog$ = dialogRef.afterClosed();
  }

}
