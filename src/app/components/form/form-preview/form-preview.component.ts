import {ChangeDetectorRef, Component, Inject, OnInit, Type} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormService} from "../../../dbManaging/form.service";
import {ValidateFormService} from "../../../services/validate.form.service";
import {Enums} from "../../../enums";
import {LoggerService} from "../../../services/logger.service";
import {Table} from "../../../directives/grid/grid-types";
import {Field, Form} from "../form-types";
import {take} from "rxjs";

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
          next: (result) => {
            console.log(result)
            if (result) {
              if (result.fields && result.fields.length > 0) {
                this.fields.forEach(field => {
                  if (field.name)
                    this.form.addControl(field.name, this.formBuilder.control('', [Validators.required]))
                });
              }
              this.changeDetectorRef.detectChanges();
            }
          },
          error: (err) => this.logger.show(err),
          complete: () => {
          }
        })
    }
  }

}
