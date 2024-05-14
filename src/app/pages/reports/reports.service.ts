import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  public sidebarShow = false;

  public token;

  constructor(private http: HttpClient, private store: Store<{ token: string }>) {
    this.store.subscribe((res) => {
      this.token = new HttpHeaders({
        Authorization: res.token,
      });
    });
  }

  configUrl = environment.ssaypBackendUrl;

  port = environment.port;

  consultGeneral(model: string, data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/${model}/report?limit=1000`, data, { headers: this.token });
  }
}
