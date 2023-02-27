import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Field, FieldItem, Form} from '../form-types';
import {FormService} from '../../../dbManaging/form.service'
import {Enums} from '../../../enums';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FieldEntryComponent} from "../../field/field-entry/field-entry.component";
import {Table} from "../../../directives/grid/grid-types";
import {ValidateFormService} from "../../../services/validate.form.service";
import {Observer, Subscription, take} from "rxjs";
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
  required: [false, []],
  requiredTrue: [false, []],
  placeholder: ['', []],
  pattern: ['', []],
  repeatPassword: [false, []]
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
  fieldGroup !: FormGroup;
  formAccessLevels = ["superAdmin", "Admin", "user"];
  formColumnCount = [1, 2, 3];
  formSaved: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
              private formService: FormService,
              private formBuilder: FormBuilder,
              private validateFormService: ValidateFormService,
              private enums: Enums,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<FormEntryComponent>,
              private logger: LoggerService) {

    this.id = this.data?.id;
    this.fieldGroup = this.formBuilder.group(fieldModel);
    this.fieldGroup.addControl('items', this.formBuilder.array([]))
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
      columnCount: ['', [
        Validators.required
      ]],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.formService.getById({params: {id: this.id}})
        .pipe(
          take(1)
        )
        .subscribe({
          next: (result: Form) => {
            console.log(result)
            if (result) {
              this.formOfFormCreator.patchValue(result);
              this.formOfFormCreator.addControl('fields', this.formBuilder.array(result.fields || []));
              this.changeDetectorRef.detectChanges();
              this.refreshFieldData();
            }
          },
          error: (err: any) => this.logger.show(err),
          complete: () => {
          }
        } as Observer<Form>)
    }
  }

  get name(): FormControl<string> {
    return this.formOfFormCreator.get('name') as FormControl;
  }

  get displayName(): FormControl<string> {
    return this.formOfFormCreator.get('displayName') as FormControl;
  }

  get accessLevel(): FormControl<string> {
    return this.formOfFormCreator.get('accessLevel') as FormControl;
  }

  get columnCount(): FormControl<string> {
    return this.formOfFormCreator.get('columnCount') as FormControl;
  }

  get fields(): FormArray {
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
    dialogRef.afterClosed().subscribe({
      next: (result: FormGroup) => {
        this.addNewField(result)
        this.refreshFieldData();
        this.errors = []
      }
    } as Observer<FormGroup>)
    this.name.markAsTouched()
  }

  refreshFieldData() {
    const fieldsTable = {
      ...this.fieldsTableData,
      rows: this.fields.value.map((f: Field) => ({
        ...f,
        'custom_required': `<span>${!!f['required']}</span>` //use this code if type be 'custom'
      })),
      columns: [
        {key: 'name', display: 'name'},
        {key: 'display', display: 'display'},
        {key: 'type', display: 'type'},
        {key: 'required', display: 'required', type: 'boolean'},
      ]
    };
    this.fieldsTableData = fieldsTable
    this.changeDetectorRef.detectChanges();
  }

  addNewField(newField: FormGroup) {
    if (!this.fields)
      this.formOfFormCreator.addControl('fields', this.formBuilder.array([]));

    this.fields.push(newField);
  }

  saveForm() {
    this.errors = [];
    if (this.formOfFormCreator.invalid)
      return this.validateFormService.validateAllControls(this.formOfFormCreator);

    if (this.fields.controls.length === 0)
      this.errors.push('field list cant be empty!')

    let cmd: Form = this.formOfFormCreator.value;
    cmd.fields?.forEach((f, index) => f.index = index);

    if (this.errors.length > 0) {
      this.showErrors = true;
    } else {
      const obs$ = this.id
        ? this.formService.update(this.id, cmd)
        : this.formService.create(cmd);
      const saveSubscription: Subscription = obs$
        .subscribe({
          next: (id: any) => {
            console.log(`form number ${id} is saved`);
            this.id ??= id;
          },
          error: err => this.logger.error(err.message),
          complete: () => {
            saveSubscription.unsubscribe();
            this.logger.success();
            this.formSaved = true;
          }
        } as Observer<any>)
    }
  }

  saveFieldsPosition(){
    this.close({id : this.id});
  }

  backToForm(){
    this.formSaved = false;
    this.refreshFieldData();
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
  CheckBox
}
