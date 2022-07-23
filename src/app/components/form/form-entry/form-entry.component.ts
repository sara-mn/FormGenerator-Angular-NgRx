import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Field, Form, FormWithFields} from '../form-types';
import {FormService} from '../../../dbManaging/form.service'
import {Enums} from 'src/app/enums';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FieldEntryComponent} from "../../field/field-entry/field-entry.component";
import {Table} from "../../../directives/grid/grid-types";
import {ValidateFormService} from "../../../services/validate.form.service";
import {take} from "rxjs";
import {LoggerService} from "../../../services/logger.service";

const fieldModel = {
  name: ['', [
    Validators.required
  ]],
  display: ['', [
    Validators.required
  ]],
  type: ['', [
    Validators.required
  ]],
  description: ['', []],
  inputFormat: ['', []],
  displayFormat: ['', []],
  accessLevel: ['', [
    Validators.required
  ]],
}

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit {
  result: any;
  id: string;
  errors: string[] = [];
  showErrors: boolean = false;
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
              private formService: FormService,
              private formBuilder: FormBuilder,
              private validateFormService: ValidateFormService,
              private enums: Enums,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<FormEntryComponent>,
              private logger : LoggerService) {

    this.id = this.data?.id;
    this.formOfFormCreator = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
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

  ngOnInit(): void {
    if (this.id) {
      this.formService.getById({params: {id: this.id}})
        .pipe(
          take(1)
        )
        .subscribe({
          next: (result) => {
            console.log(result)
            if (result) {
              this.formOfFormCreator.patchValue(result);
              this.changeDetectorRef.detectChanges();
              for (let field of (result as FormWithFields).fields) {
                const group = this.formBuilder.group(fieldModel);
                group.patchValue(field as Field);
                this.addNewField(group);
                this.refreshFieldData()
              }
            }
          },
          error: (err) => this.logger.show(err),
          complete: () => {}
        })
    }
  }

  get name(): FormControl<any> {
    return this.formOfFormCreator.get('name') as FormControl;
  }

  get displayName() {
    return this.formOfFormCreator.get('displayName') as FormControl;
  }

  get accessLevel() {
    return this.formOfFormCreator.get('accessLevel') as FormControl;
  }

  get fields() {
    return this.formOfFormCreator.get('fields') as FormArray;
  }

  isFieldValid(fieldName: string) {
    const control = this.formOfFormCreator.get(fieldName) as FormControl;
    return (control.invalid && (control.dirty || control.touched))
  }

  addField() {
    const dialogRef = this.dialog.open(FieldEntryComponent, {
      //data: this.fieldsTableData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addNewField(result)
      this.refreshFieldData();
      this.errors = []
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
    this.errors = [];
    if (this.formOfFormCreator.invalid)
      return this.validateFormService.validateAllControls(this.formOfFormCreator);

    if (this.fields.controls.length === 0)
      this.errors.push('field list cant be empty!')

    if (this.errors.length > 0) {
      this.showErrors = true;
    } else {
      const obs$ = this.id
        ? this.formService.update(this.id, this.formOfFormCreator.value)
        : this.formService.create(this.formOfFormCreator.value);
      const saveSubscription = obs$.pipe()
        .subscribe({
          next: (id) => {
            console.log(`form number ${id} is saved`);
            this.close({id});
          },
          error: err => this.logger.error(err.message),
          complete: () => {
            saveSubscription.unsubscribe();
            this.logger.success()
          }
        })
    }
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
