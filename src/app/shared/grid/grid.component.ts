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
import {Column, Table} from './grid-types';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() data!: Table<any>;
  @Output() onAddEvent = new EventEmitter<any>();
  @Output() onRefreshEvent = new EventEmitter<any>();
  @Output() onEditEvent = new EventEmitter<any>();
  @Output() onDeleteEvent = new EventEmitter<any>();
  @Output() onPreviewEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input = {value: ''};

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  rows: any[] = [];
  columns: Column[] = [];
  displayedColumns: string[] = [];
  numberOfColumns: number = 0;
  filterValue: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.generateTableData();
    this.filterValue = this.input.value;
  }

  ngOnChanges() {
    this.generateTableData()
  }

  generateTableData() {
    if (this.data.rows)
      this.rows = this.data.rows;

    if (this.data.columns?.length) {
      this.columns = this.data.columns.filter(c => !['No.' , 'action'].includes(c.key));
      this.columns.unshift({key: 'No.', display: 'No.'});
      this.columns.push({key: 'action', display: 'action'});
      this.displayedColumns = this.columns.map(c => c.key);
      this.numberOfColumns = this.columns.length;
    }
    this.dataSource.data = this.rows;
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

  onEditBtnClick(currentRow: any) {
    this.onEditEvent.emit({id: currentRow.id});
  }

  onDeleteBtnClick(currentRow: any) {
    this.onDeleteEvent.emit({id: currentRow.id});
  }

  onPreviewBtnClick(currentRow: any) {
    this.onPreviewEvent.emit({id: currentRow.id});
  }

  onRowClick(currentRow: any) {
    //ToDo function
  }
}
