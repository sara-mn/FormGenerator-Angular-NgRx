import {Component, Input, OnInit, ViewChild, OnChanges, Output, SimpleChange} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Field} from 'src/app/form/form-types';
import {Table} from './table-types';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data!: Table;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input = {value: ''};

  dataSource: MatTableDataSource<Field> = new MatTableDataSource();
  displayedColumns: string[] = [];
  numberOfColumns: number = 0;
  filterValue: any;

  constructor() {

  }

  ngOnInit(): void {
    this.filterValue = this.input.value;
    this.refresh()
  }

  ngOnChanges() {
    this.refresh()
  }

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

  refresh() {
    this.displayedColumns = Object.keys(this.data.columns[0]);
    this.numberOfColumns = this.displayedColumns.length;
    this.dataSource.data = this.data.columns;
  }
}
