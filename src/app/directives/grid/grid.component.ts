import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  Output, EventEmitter
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Table} from './grid-types';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'data-table',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
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

  constructor(public dialog: MatDialog) {}

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
      this.displayedColumns = Object.keys(this.columns[0]).filter(item => item !== 'id');
      this.displayedColumns.unshift('No.');
      this.numberOfColumns = this.displayedColumns.length;
    }
    this.dataSource.data = this.columns;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.dataSource.sort.sortChange.subscribe(() => {
      if (this.dataSource.paginator)
        this.dataSource.paginator.pageIndex = 0
    });
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
}
