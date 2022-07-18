import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Enums} from "../../../enums";

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
  fieldTypes: string[];
  fieldGroup !: FormGroup;
  fieldAccessLevels = ["superAdmin", "Admin","user"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private formBuilder: FormBuilder,
              private enums: Enums,
              public dialogRef: MatDialogRef<FieldEntryComponent>) {
    this.id = this.data?.id || 0;
    this.fieldTypes = this.enums.fieldType().getKeys();
  }

  ngOnInit(): void {
    this.fieldGroup = this.formBuilder.group(fieldModel);
  }

  add() {
    this.close(this.fieldGroup);
  }

  close(result: any) {
    this.dialogRef.close(result);
  }
}
