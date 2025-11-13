import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'viajes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/viajes/pages/lista-viajes/lista-viajes.component')
        .then((m) => m.ListaViajesComponent),
  },

  {
    path: 'viajes/:id/asientos',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/viajes/pages/asientos-viaje/asientos-viaje.component'
      ).then((m) => m.AsientosViajeComponent),
  },

  {
    path: 'viajes/:id/pasajero',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/viajes/pages/datos-pasajero/datos-pasajero.component'
      ).then((m) => m.DatosPasajeroComponent),
  },

  {
    path: 'pago',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/viajes/pages/pago/pago.component').then(
        (m) => m.PagoComponent
      ),
  },

  // 👇 ESTA RUTA DEBE IR ANTES DEL WILDCARD ❗
  {
    path: 'boleto',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/viajes/pages/boleto/boleto.component').then(
        (m) => m.BoletoComponent
      ),
  },

  // 👇 WILDCARD SIEMPRE ÚLTIMO
  { path: '**', redirectTo: 'login' },
];
