import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GaleriaComponent } from '../galeria/galeria.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosGComponent } from '../productosG/productosG.component';
import { ContactoComponent } from '../contacto/contacto.component';

@Component({
  selector: 'app-inicio',
  imports: [
    CommonModule,
    GaleriaComponent,
    RouterModule,
    ReactiveFormsModule,
    ProductosGComponent,
    ContactoComponent
],


  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true
})
export class InicioComponent {

}
