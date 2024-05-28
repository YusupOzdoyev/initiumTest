import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {IClient} from "../client.interface";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent {
  public newClientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IClient,

  ) {
    this.newClientForm = new FormGroup({
      name:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)])
    })

    this.newClientForm.valueChanges.subscribe(value => {
      this.data = { ...this.data, ...value };
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
