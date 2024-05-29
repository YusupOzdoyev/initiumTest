import {
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IClient } from '../client.interface';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-change-client',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './change-client.component.html',
  styleUrl: './change-client.component.scss'
})
export class ChangeClientComponent {
  public changeClientForm: FormGroup;
  public dialogRef = inject(MatDialogRef<ChangeClientComponent>);
  private readonly temp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IClient) {
    this.changeClientForm = new FormGroup({
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      phone: new FormControl(Number(this.data.phone), [Validators.pattern(this.temp)]),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(2)]),
      surname: new FormControl(data.surname, [Validators.required, Validators.minLength(2)]),
    })
    this.changeClientForm.valueChanges.subscribe(value => {
      this.data = { ...this.data, ...value };
    });
    console.log(data);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
