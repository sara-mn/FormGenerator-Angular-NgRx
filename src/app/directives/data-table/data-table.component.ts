import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  Output,
  SimpleChange,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Field} from 'src/app/components/form/form-types';
import {Table} from './table-types';
import {catchError, fromEvent, Observable, Subscription, switchMap, take, tap, throwError} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit,OnDestroy {
  @Input() data!: Table<any>;
  @Output() onAddEvent !: () => void;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input = {value: ''};

  dataSource: MatTableDataSource<Field> = new MatTableDataSource();
  columns: any[] = [];
  displayedColumns: string[] = [];
  numberOfColumns: number = 0;
  filterValue: any;
  createNewSubscription: any;
  fetch = new Observable();

  constructor() {
  }

  ngOnInit(): void {
    this.fetch = this.data.getColumns$
      .pipe(
        tap((cols) => {
          console.log('data fetching')
          this.columns = cols;
          if(cols.length){
            this.displayedColumns = Object.keys(cols[0]);
            this.numberOfColumns = this.displayedColumns.length;
          }
          this.dataSource.data = cols;
        }),
        take(1),
        catchError((error) => {
          return throwError(error)
        })
      );

    this.fetch.subscribe((a) => {
      console.log('data fetched')
    })

    this.filterValue = this.input.value;
  }

  //
  // ngOnChanges() {
  //   this.fetch()
  // }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.createNewSubscription.unsubscribe();
  }
}
