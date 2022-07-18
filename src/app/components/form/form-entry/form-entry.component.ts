import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Field, Form} from '../form-types';
import {FormService} from '../../../dbManaging/form.service'
import {Enums} from 'src/app/enums';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {FieldEntryComponent} from "../../field/field-entry/field-entry.component";
import {Table} from "../../../directives/grid/grid-types";
import {Error_Directive_Input} from "../../../directives/formValidators/validation.type";
import {ValidateFormService} from "../../../services/validate.form.service";

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit {
  result: any;
  id: number = 0;
  fieldsTableData: Table<Field> = {
    hasFilter: false,
    hasSort: false,
    hasPagination: false,
    addable: true,
    removable: true,
    editable: true
  };
  formOfFormCreator!: FormGroup;
  formAccessLevels = ["superAdmin", "Admin", "user"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private formService: FormService,
              private formBuilder: FormBuilder,
              private validateFormService: ValidateFormService,
              private enums: Enums,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<FormEntryComponent>) {

    this.id = this.data?.id || 0;
  }

  ngOnInit(): void {
    if (this.id) {

    }
    this.formOfFormCreator = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        (control: AbstractControl) => {
          // remove anything that isn't a digit
          const numDigits = control.value.replace(/[^\d]+/g, '').length;
          // Only worried about US-based numbers for now, no need for country code
          if (numDigits === 10) {
            return null;
          }
          // Uh oh, something's wrong
          if (numDigits > 10) {
            return {
              tooLong: {numDigits}
            };
          } else {
            return {
              tooShort: {numDigits}
            };
          }

        }
      ]],
      displayName: ['', []],
      accessLevel: ['', [
        Validators.required
      ]],
      fields: this.formBuilder.array([
        // this.formBuilder.group(fieldModel)
      ]),
    });
  }

  get name(): FormControl<any> {
    return this.formOfFormCreator.get('name') as FormControl;
  }

  get displayName() {
    return this.formOfFormCreator.get('return') as FormControl;
  }

  get accessLevel() {
    return this.formOfFormCreator.get('accessLevel') as FormControl;
  }

  get fields() {
    return this.formOfFormCreator.get('fields') as FormArray;
  }

  addField() {
    const dialogRef = this.dialog.open(FieldEntryComponent, {
      //data: this.fieldsTableData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addNewField(result)
      this.refreshFieldData();
    })
    this.name.markAsTouched()
  }

  refreshFieldData() {
    const fieldsTable = {
      ...this.fieldsTableData,
      columns: this.fields.value
    };
    this.fieldsTableData = fieldsTable
    this.changeDetectorRef.detectChanges();
  }

  addNewField(newField: FormGroup) {
    this.fields.push(newField);
  }

  saveForm() {
    // if (this.formOfFormCreator.invalid)
      // this.validateFormService.validateAllControls(this.formOfFormCreator);
    // else
      this.formService.create(this.formOfFormCreator.value)
        .pipe()
        .subscribe({
          next: (id) => {
            console.log(`form number ${id} is saved`);
            this.close({id});
          },
          error: err => console.log(err.timestamp, err.message)
        })
  }

  convertToArray(obj: any) {
    return Object.keys(obj).map(key => {
      return {key, value: obj[key]}
    })
  }

  close(result: any) {
    this.dialogRef.close(result);
  }
}

enum fieldType {
  Date,
  Text,
  Email,
  Number,
  DateRange,
  List,
  Radio,
  CheckbOX
}
