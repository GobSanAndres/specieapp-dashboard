import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonitoringAgriculturalPricesService {
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

  /**
   * La función permite obtener la lista de los seguimientos de precios agropecuario
   * de precio sobre la agricultura con su configuración de la API
   * @returns retorna un objeto Observable
   */
  getMonitoringAgricultural(data:any):Observable<Object> {
    return this.http
      .get(`${this.configUrl}:${this.port}/v1/api/monitoring-agricultural-prices/list?limit=1000&active=${data.state}`, {
        headers: this.token,
      });
  }

  /**
 * La función sirve para cambiar el estado de un seguimiento de precios agropecuario
 * @param data los datos para cambiar el estado del seguimiento de precio agropecuario
 * @returns un observable para cambiar el estado
 */
  updateStateMonitoringAgricultural(data:any) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/monitoring-agricultural-prices/disable`, data, {
      headers: this.token,
    });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  updateCostsIncome(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/monitoring-agricultural-prices/update`, data, { headers: this.token });
  }
}
