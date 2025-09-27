import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RegistroComponent } from './registro/registro.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InicioComponent },
  { path: 'ingresar', component: LoginComponent },
  { path: 'admin', component: AdministradorComponent },
  {path: 'carrito', component:CarritoComponent},
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'home' },
  
];
