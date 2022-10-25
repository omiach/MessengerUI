import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { ACCES_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public httpClient: HttpClient,
    @Inject(BACKEND_API_URL) private uriBase: string) { }

  public get(uri: string | undefined, guid?: string, search?: { [key: string]: string }): Observable<Object> {
    if (uri === undefined) {
      return of({});
    }

    var params = new HttpParams();
    if (search !== null) {
      for (const key in search) {
        params = params.append(key, search[key]);
      }
    }

    if (guid != undefined && guid != "" && guid != null) {
      return this.httpClient.get(this.uriBase.concat(uri).concat("/" + guid), { params: params });
    }

    return this.httpClient.get(this.uriBase.concat(uri), { params: params });
  }

  public post(uri: string | undefined, entity: any) {
    if (uri === undefined || uri === "") {
      return of({});
    }

    return this.httpClient.post(this.uriBase.concat(uri), entity);
  }

  public put(uri: string, guid: string, entity: any) {
    if (uri === undefined) {
      return of({});
    }

    return this.httpClient.put(this.uriBase.concat(uri + "/" + guid), entity);
  }

}