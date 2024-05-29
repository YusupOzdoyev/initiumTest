import {
  takeUntil,
  catchError,
  throwError,
  Observable,
  ReplaySubject,
} from "rxjs";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClientDataService } from "./client-data.service";
import { IClientsData, IClient } from "./client.interface";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewClientComponent } from './new-client/new-client.component';
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { ChangeClientComponent } from './change-client/change-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    HttpClientModule,
    MatCheckboxModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public name: string = '';
  public email: string = '';
  public phone: string = '';
  public surname: string = '';
  public checked: boolean = false;

  public clients!: IClientsData;
  public parentChecked: boolean = false;
  public parentIndeterminate: boolean = false;

  private _onDestroy$: ReplaySubject<void>;

  private _dialogRef = inject(MatDialog);
  private _clientDataService = inject(ClientDataService);

  constructor() {
    this._onDestroy$ = new ReplaySubject<void>(1);
  }

  ngOnInit(): void {
    let existingClients: string | null = localStorage.getItem('clients');
    if (existingClients) {
      this.clients = JSON.parse(existingClients);
    } else {
      this.getClients()
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public getClients(): void {
    this._clientDataService.getClients().pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      takeUntil(this._onDestroy$)
    ).subscribe((response: IClientsData) => {
      this.clients = response;
      this.clients.users.forEach(user => {
        user.checked = false;
      });
      localStorage.setItem('clients', JSON.stringify(this.clients));
    })
  }

  public openDialogAddNewClient(): void {
    const dialogRef: MatDialogRef<NewClientComponent> = this._dialogRef.open(NewClientComponent, {
      data: {
        name: this.name,
        email: this.email,
        phone: this.phone,
        checked: this.checked,
        surname: this.surname,
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users.push(result);
        localStorage.setItem('clients', JSON.stringify(this.clients));
      }
    });
  }

  public openDialogDeleteClients(): void {
    const checkedClientsCount: number = this.clients.users.reduce(
      (count, client) => client.checked ? count + 1 : count, 0
    );

    const dialogRef: MatDialogRef<DeleteClientComponent> = this._dialogRef.open(DeleteClientComponent, {
      data: { checkedClientsCount: checkedClientsCount },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users = this.clients.users.filter(client => !client.checked);
        localStorage.setItem('clients', JSON.stringify(this.clients));
        this.parentChecked = false;
        this.parentIndeterminate = false;
      }
    });
  }

  public openDialogChangeClient(selectedUserIndex: number, selectedUser: IClient) {
    const dialogRef: MatDialogRef<ChangeClientComponent> = this._dialogRef.open(ChangeClientComponent, {
      data: {
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        checked: selectedUser.checked,
        surname: selectedUser.surname,
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.users[selectedUserIndex] = result;
        localStorage.setItem('clients', JSON.stringify(this.clients));
      }
    });
  }

  public toggleChecked() {
    this.parentChecked = !this.parentChecked;
    for (const user of this.clients.users) {
      user.checked = this.parentChecked;
    }
    this.parentIndeterminate = false;
  }

  public updateCheckboxes(index: number) {
    this.toggleUserChecked(index);
    this.updateIndeterminate();
  }

  public toggleUserChecked(index: number) {
    this.clients.users[index].checked = !this.clients.users[index].checked;
  }

  public updateIndeterminate() {
    let checked: number = 0;
    let unchecked: number = 0;
    const length: number = this.clients.users.length;
    this.clients.users.forEach((user) => {
      user.checked ? checked++ : unchecked++;
    });
    this.parentIndeterminate = (checked !== length && unchecked !== length);
    this.parentChecked = this.parentIndeterminate || length === checked;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert('Непредвиденная ошибка');
    return throwError(() => error);
  }
}
