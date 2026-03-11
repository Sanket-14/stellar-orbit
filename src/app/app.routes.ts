import { Routes } from '@angular/router';
import { ApiDemoComponent } from './components/api-demo/api-demo.component';

export const routes: Routes = [
    { path: 'api-demo', component: ApiDemoComponent },
    {
        path: '', pathMatch: 'full', loadComponent: () => {
            return import('./components/counter/counter').then(m => m.Counter);
        },
    },
    {
        path: 'todo', pathMatch: 'full', loadComponent: () => {
            return import('./todo/todo').then(m => m.Todo);
        }
    }
];
