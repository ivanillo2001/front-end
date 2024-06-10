import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'primeraDivision',
    loadComponent: () =>
      import('./components/primera-division/primera-division.component').then((c) => c.PrimeraDivisionComponent),
  },
  {
    path: 'segundaDivision',
    loadComponent: () =>
      import('./components/segunda-division/segunda-division.component').then((c) => c.SegundaDivisionComponent),
  },
  {
    path: 'addJugador',
    loadComponent: () =>
      import('./components/crear-jugador/crear-jugador.component').then((c) => c.CrearJugadorComponent),
  },
  {
    path: 'editarJugador',
    loadComponent: () =>
      import('./components/editar-jugador/editar-jugador.component').then((c) => c.EditarJugadorComponent),
  },
  {
    path: 'eliminarJugador',
    loadComponent: () =>
      import('./components/eliminar-jugador/eliminar-jugador.component').then((c) => c.EliminarJugadorComponent),
  },
  {
    path: 'nuevaPareja',
    loadComponent: () =>
      import('./components/nueva-pareja/nueva-pareja.component').then((c) => c.NuevaParejaComponent),
  },
  {
    path: 'crearPartido',
    loadComponent: () =>
      import('./components/crear-partido/crear-partido.component').then((c) => c.CrearPartidoComponent),
  },
  {
    path: 'historialPartidos',
    loadComponent: () =>
      import('./components/historial-partidos/historial-partidos.component').then((c) => c.HistorialPartidosComponent),
  },
  {
    path: 'ayuda',
    loadComponent: () =>
      import('./components/ayuda/ayuda.component').then((c) => c.AyudaComponent),
  },
  {
    //localhost:4200
    path: '',
    redirectTo: '/home',
    pathMatch: 'full', //carga el path completo
  },
  {
    //path erroneo
    path: '**',
    loadComponent: () =>
      import('./components/pagina404/pagina404.component').then(
        (c) => c.Pagina404Component
      ),
  },
];
