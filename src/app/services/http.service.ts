import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class HttpService {
  constructor(private http: HttpClient) {
    // do nothing
  }

  configUrl = environment.ssaypBackendUrl;

  port = environment.port;

  getRoles(token) {
    const httpOptions = this.armarHeader(token);
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/rol/list?limit=1000`, httpOptions);
  }

  login(credentials) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/auth/login`, credentials);
  }

  armarHeader(token) {
    const headersObject = new HttpHeaders({
      Authorization: `${token}`,
    });

    const httpOptions = {
      headers: headersObject,
    };

    return httpOptions;
  }
}
