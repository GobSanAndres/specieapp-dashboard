import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
