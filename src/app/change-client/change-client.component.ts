import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IClient } from '../client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './change-client.component.html',
  styleUrl: './change-client.component.scss'
})
export class ChangeClientComponent {
  
  public changeClientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangeClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IClient,

  ) {
    this.changeClientForm = new FormGroup({
      name:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)])
    })

    this.changeClientForm.valueChanges.subscribe(value => {
      this.data = { ...this.data, ...value };
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
