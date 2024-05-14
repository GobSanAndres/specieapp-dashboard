import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
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

  getSpecies(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/species/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createSpecie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/species/create`, data, { headers: this.token });
  }

  updateSpecie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/species/update`, data, { headers: this.token });
  }

  disableSpecie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/species/disable`, data, { headers: this.token });
  }
}
