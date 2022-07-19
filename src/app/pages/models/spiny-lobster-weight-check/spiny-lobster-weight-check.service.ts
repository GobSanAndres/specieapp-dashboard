import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SpinyLobsterWeightCheckService {
  public sidebarShow = false;

  public token;

  constructor(private http: HttpClient, private store: Store<{ token: string }>) {
    this.store.subscribe((res) => {
      this.token = new HttpHeaders({
        Authorization: res.token,
      });
    });
  }

  configUrl = 'https://san-andres-species-app.herokuapp.com';

  port = 443;

  getSpinyLobster(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/spiny-lobster-sw-check/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  getFishingSite(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-site/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getBoat(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/boat/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createSpinyLobster(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/spiny-lobster-sw-check/create`, data, { headers: this.token });
  }

  updateSpinyLobster(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/spiny-lobster-sw-check/update`, data, { headers: this.token });
  }

  disableSpinyLobster(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/spiny-lobster-sw-check/disable`, data, { headers: this.token });
  }
}
