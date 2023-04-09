import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from "./grid/grid.component";
import {MaterialModule} from "../material.madule";
import {PipesModule} from "../pipes/pipes.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenDialogComponent } from './open.dialog/open.dialog.component';


@NgModule({
  declarations: [
    GridComponent,
    OpenDialogComponent
  ],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
