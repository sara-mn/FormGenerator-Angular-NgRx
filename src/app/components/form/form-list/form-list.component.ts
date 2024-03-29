import {Component, OnInit, ChangeDetectorRef, ComponentRef, TemplateRef} from '@angular/core';
import {Field, Form} from '../form-types';
import {Table} from '../../../shared/grid/grid-types';
import {FormService} from "../../../dbManaging/form.service";
import {FormEntryComponent} from "../form-entry/form-entry.component";
import {AsyncSubject, Observable, Observer, switchMap, take, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {LoggerService} from "../../../services/logger.service";
import {AlertService} from "../../../services/alert.service";
import {ComponentType} from "@angular/cdk/portal";
import {FormPreviewComponent} from "../form-preview/form-preview.component";
import {ActivatedRoute, Router } from '@angular/router';
import {Dialog} from "../../../shared/open.dialog/types";

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
    rows: [{}]
  };
  formSubject$ = new AsyncSubject<Form[]>();
  fetch$: Observable<Form[]>

  constructor(private formService: FormService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private logger : LoggerService,
              private alert : AlertService,
              private route: ActivatedRoute,
              private router : Router) {
    this.fetch();
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    const formSubscription = this.formService.getAll()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cols: Form[]) => {
          const table = {
            ...this.tableData,
            rows: cols,
            columns: [
              {key: 'name', display: 'name'},
              {key: 'displayName', display: 'display'}
            ]
          };
          this.tableData = table
        },
        error: (err) => this.logger.show(err),
        complete: () => {
          console.log('completed!');
          this.changeDetectorRef.detectChanges();  //   because zone change detection not support indexedDB
         // formSubscription.unsubscribe();        // use take(1) instead
        }
      } as Observer<Form[]>);
  }

  updateTableData(rows: Form[]) {
    let k: Table<Form> = {
      ...this.tableData,
      rows,
      columns: [
        {key: 'name', display: 'name'},
        {key: 'display', display: 'display'}
      ]
    };
    return k
  }

  addForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  editForm(data: { id: string }) {
    this.router.navigate(['edit',data.id], { relativeTo: this.route });
  }

  previewForm(data: { id: string }) {
    this.router.navigate(['preview',data.id], { relativeTo: this.route });
  }

  deleteForm(data: any) {
    const title = 'Are you sure?';
    const message = 'delete form'
    this.alert.confirm(title,message, () =>
      this.formService.delete(data.id).subscribe({
        next: () => {
          this.logger.success();
          this.fetch();
        },
        error: (err) => {this.logger.error(err.message)}
      }));
  }

  refreshData() {
    this.fetch();
  }
}
