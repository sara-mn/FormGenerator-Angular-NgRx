import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  }

  get name(): FormControl<any> {
    return this.fieldGroup.get('name') as FormControl;
  }

  get display() {
    return this.fieldGroup.get('display') as FormControl;
  }

  get accessLevel() {
    return this.fieldGroup.get('accessLevel') as FormControl;
  }

  get type(): FormControl<any> {
    return this.fieldGroup.get('type') as FormControl;
  }

  get description() {
    return this.fieldGroup.get('description') as FormControl;
  }

  get inputFormat() {
    return this.fieldGroup.get('inputFormat') as FormControl;
  }

  get displayFormat() {
    return this.fieldGroup.get('displayFormat') as FormControl;
  }

  isFieldValid(fieldName: string) {
    const control = this.fieldGroup.get(fieldName) as FormControl;
    return (control.invalid && (control.dirty || control.touched))
  }

  add() {
    this.errors = [];
    if (this.fieldGroup.invalid)
      return this.validateFormService.validateAllControls(this.fieldGroup);

    if (this.errors.length > 0) {
      this.showErrors = true;
    } else
      this.close(this.fieldGroup);
  }

  close(result: any) {
    this.dialogRef.close(result);
  }
}
