import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  Output,
  OnDestroy, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Table} from './table-types';
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit , OnChanges {
  @Input() data!: Table<any>;
  @Output() onAddEvent = new EventEmitter<any>();
  @Output() onRefreshEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input = {value: ''};

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any[] = [];
  displayedColumns: string[] = [];
  numberOfColumns: number = 0;
  filterValue: any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(public dialog: MatDialog,
              ) {

  }

  ngOnInit(): void {
    this.generateTableData();
    this.filterValue = this.input.value;
  }

  ngOnChanges() {
    this.generateTableData()
  }

  generateTableData() {
    if (this.data.columns)
      this.columns = this.data.columns;

    if (this.columns.length) {
      this.displayedColumns = Object.keys(this.columns[0]);
      this.numberOfColumns = this.displayedColumns.length;
    }
    this.dataSource.data = this.columns;
    // this.changeDetectorRefs.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.dataSource.sort.sortChange.subscribe(() => {
      if (this.dataSource.paginator)
        this.dataSource.paginator.pageIndex = 0
    });

    // merge(this.dataSource.sort.sortChange, this.dataSource.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.data.getColumns$.pipe(catchError(() => of(null)));
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = data === null;
    //
    //       if (data === null) {
    //         return [];
    //       }
    //       this.columns = data;
    //       if (data.length) {
    //         this.displayedColumns = Object.keys(data[0]);
    //         this.numberOfColumns = this.displayedColumns.length;
    //       }
    //       return data;
    //     }),
    //   )
    //   .subscribe(data => (this.dataSource.data = data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddBtnClick() {
    this.onAddEvent.emit();
  }

  onRefreshBtnClick() {
    this.onRefreshEvent.emit();
  }

  ngOnDestroy() {
    //this.refreshData();
  }
}
