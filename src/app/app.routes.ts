import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full', data: {animation: 'inicioAnimacion'}},
    {path: 'inicio', component: InicioComponent, data: {animation: 'inicioAnimacion'}},
    {path: 'contactanos', component: ContactanosComponent, data: {animation: 'contactanosAnimacion'}},
    {path: 'trabajos/:id', component: TrabajosComponent, data: {animation: 'trabajosAnimation'}},
    {path: 'trabajos', component: TrabajosComponent, data: {animation: 'trabajosAnimation'}},
    {path: '**', component: NotFoundComponent, data: {animation: 'notFoundAnimation'}}
];
