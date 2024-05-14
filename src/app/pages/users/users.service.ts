import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
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

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=1000&active=${status}`, { headers: this.token });
  }

  getRols() {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/rol/list?limit=1000`, { headers: this.token });
  }

  createUser(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/user/create`, data, { headers: this.token });
  }

  updateUser(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/user/update`, data, { headers: this.token });
  }

  disableUser(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/user/disable`, data, { headers: this.token });
  }
}
