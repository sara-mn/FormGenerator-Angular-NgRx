import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Enums} from "../../../enums";
import {ValidateFormService} from "../../../services/validate.form.service";

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
  required: ['', []],
  requiredTrue: ['', []],
  placeholder: ['', []],
  pattern: ['', []],
  min: ['', []],
  max: ['', []],
  minLength: ['', []],
  maxLength: ['', []],
  repeatPassword: ['', []]
}

const itemModel = {
  key: ['', [Validators.required]],
  value: ['', [Validators.required]]
}

@Component({
  selector: 'app-field-entry',
  templateUrl: './field-entry.component.html',
  styleUrls: ['./field-entry.component.scss']
})
export class FieldEntryComponent implements OnInit {
  result: any;
  id: number = 0;
  errors: string[] = [];
  showErrors: boolean = false;
  fieldTypes: string[];
  fieldGroup !: FormGroup;
  fieldAccessLevels = ["superAdmin", "Admin", "user"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private formBuilder: FormBuilder,
              private enums: Enums,
              public dialogRef: MatDialogRef<FieldEntryComponent>,
              private validateFormService: ValidateFormService) {
    this.id = this.data?.id || 0;
    this.fieldTypes = this.enums.fieldType().getKeys();
  }

  ngOnInit(): void {
    this.fieldGroup = this.formBuilder.group(fieldModel);
    this.fieldGroup.addControl('items', this.formBuilder.array([]))
  }

  get name(): FormControl<string> {
    return this.fieldGroup.get('name') as FormControl;
  }

  get display(): FormControl<string> {
    return this.fieldGroup.get('display') as FormControl;
  }

  get accessLevel(): FormControl<string> {
    return this.fieldGroup.get('accessLevel') as FormControl;
  }

  get type(): FormControl<string> {
    return this.fieldGroup.get('type') as FormControl;
  }

  get description(): FormControl<string> {
    return this.fieldGroup.get('description') as FormControl;
  }

  get inputFormat(): FormControl<string> {
    return this.fieldGroup.get('inputFormat') as FormControl;
  }

  get displayFormat(): FormControl<string> {
    return this.fieldGroup.get('displayFormat') as FormControl;
  }

  get required(): FormControl<boolean> {
    return this.fieldGroup.get('required') as FormControl;
  }

  get requiredTrue(): FormControl<boolean> {
    return this.fieldGroup.get('requiredTrue') as FormControl;
  }

  get min(): FormControl<number> {
    return this.fieldGroup.get('min') as FormControl;
  }

  get max(): FormControl<number> {
    return this.fieldGroup.get('max') as FormControl;
  }

  get minLength(): FormControl<number> {
    return this.fieldGroup.get('minLength') as FormControl;
  }

  get maxLength(): FormControl<number> {
    return this.fieldGroup.get('maxLength') as FormControl;
  }

  get placeholder(): FormControl<string> {
    return this.fieldGroup.get('placeholder') as FormControl;
  }

  get pattern(): FormControl<string> {
    return this.fieldGroup.get('pattern') as FormControl;
  }

  get repeatPassword(): FormControl<boolean> {
    return this.fieldGroup.get('repeatPassword') as FormControl;
  }

  get items(): FormArray {
    return this.fieldGroup.get('items') as FormArray;
  }

  onTypeChange(event: any){
    if(event.value === 'Radio' || event.value === 'List')
      this.addItem(this.formBuilder.group(itemModel));
  }

  onAddItem() {
    this.addItem(this.formBuilder.group(itemModel));
  }

  onDeleteItem(index: number) {
    this.items.removeAt(index);
  }

  addItem(newItem: FormGroup) {
    this.items.push(newItem);
  }

  add() {
    this.errors = [];
    if (this.fieldGroup.invalid)
      return this.validateFormService.validateAllControls(this.fieldGroup);

    if (this.errors.length > 0) {
      this.showErrors = true;
    } else {
      this.close(this.fieldGroup);
    }
  }

  close(result: any) {
    this.dialogRef.close(result);
  }

  // isFieldValid(fieldName: string , group?:  AbstractControl) {
  //   const control = (group ? group : this.fieldGroup as FormGroup).get(fieldName) as FormControl;
  //   return (control.invalid && (control.dirty || control.touched))
  // }
}
