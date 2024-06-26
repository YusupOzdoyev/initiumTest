import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { IClientsData } from "./client.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private _http = inject(HttpClient);

  public getClients(): Observable<IClientsData> {
    return this._http.get<IClientsData>('https://test-data.directorix.cloud/task1/',).pipe(
      catchError((error: HttpErrorResponse) =>
        throwError(() => error))
    )
  }
}