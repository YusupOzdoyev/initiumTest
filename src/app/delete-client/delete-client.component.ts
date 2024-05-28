import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IDeleteClient } from '../client.interface';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.scss'
})
export class DeleteClientComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteClient,
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}