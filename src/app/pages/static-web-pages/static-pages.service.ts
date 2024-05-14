import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaticPagesService {
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

  getWebPage(from: number, limit: number, active: boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/webpage/list?limit=${limit}&from=${from}&active=${active}`, { headers: this.token });
  }

  getWebSite(from: number, limit: number, active: boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/website/list?limit=${limit}&from=${from}&active=${active}`, { headers: this.token });
  }

  createWebPage(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/webpage/create`, data, { headers: this.token });
  }

  createWebSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/website/create`, data, { headers: this.token });
  }

  updateWebPage(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/webpage/update`, data, { headers: this.token });
  }

  updateWebSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/website/update`, data, { headers: this.token });
  }

  disableWebPage(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/webpage/disable`, data, { headers: this.token });
  }

  disableWebSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/website/disable`, data, { headers: this.token });
  }
}
