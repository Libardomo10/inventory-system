import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login)
    },
    {
        path: 'inventory',
        canActivate: [authGuard],
        loadComponent: () => import('./features/inventory/pages/inventory/inventory').then(m => m.Inventory),
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
