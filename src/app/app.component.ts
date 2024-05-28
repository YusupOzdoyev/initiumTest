import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDataService} from "./client-data.service";
import {catchError, finalize, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {IClientsData} from "./client.interface";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public clients?: IClientsData;
  private _onDestroy$: ReplaySubject<void>;

  constructor(private _clientDataService: ClientDataService) {
    this._onDestroy$ = new ReplaySubject<void>(1);
  }

  ngOnInit(): void {
    this.getClients();
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
    })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
