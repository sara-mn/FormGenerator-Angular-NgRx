import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Form} from '../form-types';
import {FormService} from '../../../dbManaging/form.service'
import {Enums} from 'src/app/enums';
import {FormControl, FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit {
  result: any;
  id: number = 0;
 // form: Form;
  fieldTypes: string[];
  formOfFormCreator: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private formService: FormService,
              private formBuilder: FormBuilder,
              private enums: Enums,
              public dialogRef: MatDialogRef<FormEntryComponent>) {

    this.id = this.data?.id || 0;
    this.fieldTypes = this.enums.fieldType().getKeys();
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
      fields:this.formBuilder.array([
        this.formBuilder.group({
          formId: ['', [
            Validators.required
          ]],
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
          displayFormat: ['', []]
        })
      ]),
    })


  }

  ngOnInit(): void {
    if (this.id) {

    }


  }

  saveField() {
    // try {
    //   this.form.id = await this.formService.create(this.form) as number;
    //   console.log(`field number ${this.form.id} is saved`);
    //   this.close({id : this.form.id});
    // } catch (e) {
    //   console.log(e);
    // }
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
