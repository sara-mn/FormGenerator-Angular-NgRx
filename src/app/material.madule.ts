import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from '@angular/material/table';
import {MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MAT_SELECT_CONFIG, MatSelectModule} from '@angular/material/select';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from "@angular/router";
import {MatDatepickerIntl, MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MatNativeDateModule, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions} from "@angular/material/checkbox";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';
import {ErrorStateMatcher} from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TextFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    DragDropModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 3000}
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, //dialog
      useValue: {
        hasBackdrop: true,
        width: "70%",
        //height: "80%",
        maxHeight: "90%",
        maxWidth: "90%",
        position: {top: '5%'}
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, //form
      useValue: {
        // appearance: 'fill'
      }
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: {color: 'accent'},
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        disableOptionCentering: false,        //Whether option centering should be disabled.
        // overlayPanelClass:  ,              //Class or list of classes to be applied to the menu's overlay panel => string | string[] | Set<string> | { [key: string]: any; }
        // typeaheadDebounceInterval: 1000    //Time to wait in milliseconds after the last keystroke before moving focus to an item.
      }
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {}
    },
    {
      provide: MatDatepickerIntl
    },

    // {
    //   provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
    //   useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions
    // },
    // {
    //   provide: ErrorStateMatcher,
    //   useClass: ShowOnDirtyErrorStateMatcher
    // },
    // {
    //   provide: MAT_DATE_FORMATS,
    //   useValue: {
    //     parse: {
    //       dateInput: 'LL',
    //     },
    //     display: {
    //       dateInput: 'LL',
    //       monthYearLabel: 'MMM YYYY',
    //       dateA11yLabel: 'LL',
    //       monthYearA11yLabel: 'MMMM YYYY',
    //     }
    //   }
    // },
  ],
})
export class MaterialModule {
}
