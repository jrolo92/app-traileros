import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full',
  },
  {
    path: 'folder/ajustes',
    loadComponent: () => import('./pages/ajustes/ajustes.page').then((m) => m.AjustesPage),
  },
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),
  }

];
