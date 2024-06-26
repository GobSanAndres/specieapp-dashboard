import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { RouteAdmin, RoutesAgro, RoutesPesca } from './vertical-menu-items';

@Injectable({
  providedIn: 'root',
})
export class VerticalSidebarService {
  public screenWidth: any;

  public collapseSidebar: boolean = false;

  public fullScreen: boolean = false;

  public tipoUsuario:string;

  MENUITEMS: RouteInfo[];

  items;

  constructor() {
    // do nothing
  }

  elegirMenuPerzonalisado() {
    if (this.tipoUsuario === 'admin') {
      this.MENUITEMS = RouteAdmin;
    } else if (this.tipoUsuario === 'pesca') {
      this.MENUITEMS = RoutesPesca;
    } else if (this.tipoUsuario === 'agro') {
      this.MENUITEMS = RoutesAgro;
    }
    this.items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);
  }
}
