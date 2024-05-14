import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FishingAreaService {
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

  getFishingArea(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-area/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createFishingArea(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-area/create`, data, { headers: this.token });
  }

  updateFishingArea(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-area/update`, data, { headers: this.token });
  }

  disableFishingArea(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-area/disable`, data, { headers: this.token });
  }
}
