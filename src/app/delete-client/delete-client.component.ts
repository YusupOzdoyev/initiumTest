import { Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IDeleteClient } from '../client.interface';
import { ChangeClientComponent } from '../change-client/change-client.component';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.scss'
})
export class DeleteClientComponent {
  public dialogRef = inject(MatDialogRef<ChangeClientComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDeleteClient) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}