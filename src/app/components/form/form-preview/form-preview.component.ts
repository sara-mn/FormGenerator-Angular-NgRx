import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormService} from "../../../dbManaging/form.service";
import {ValidateFormService} from "../../../services/validate.form.service";
import {Enums} from "../../../enums";
import {LoggerService} from "../../../services/logger.service";
import {Table} from "../../../shared/grid/grid-types";
import {Field, Form} from "../form-types";
import {Observer, take} from "rxjs";

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {
  result: any;
  templateId: string;
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
  form: FormGroup = new FormGroup({});
  formAccessLevels = ["superAdmin", "Admin", "user"];
  fields: Field[];
  formColumnCount: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
              private formService: FormService,
              private formBuilder: FormBuilder,
              private validateFormService: ValidateFormService,
              private enums: Enums,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private logger: LoggerService) {

    this.templateId = this.data.id;
  }

  ngOnInit(): void {
    if (this.templateId) {
      this.formService.getById({params: {id: this.templateId}})
        .pipe(
          take(1)
        )
        .subscribe({
          next: (result: Form) => {
            console.log(result)
            if (result) {
              this.formColumnCount = result.columnCount ?? 1;
              if (result.fields && result.fields.length > 0) {
                this.fields = result.fields;
                this.fields.forEach(field => {
                  if (field.name) {
                    if (field.type === 'DateRange') {
                      this.form.addControl(field.name + 'start', this.formBuilder.control('', [Validators.required]))
                      this.form.addControl(field.name + 'end', this.formBuilder.control('', [Validators.required]))
                    } else
                      this.form.addControl(field.name, this.formBuilder.control('', [Validators.required]))
                  }
                });
              }
              this.changeDetectorRef.detectChanges();
            }
          },
          error: (err) => this.logger.show(err),
          complete: () => {
          }
        } as Observer<Form>)
    }
  }
}
