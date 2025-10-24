import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GaleriaComponent } from '../galeria/galeria.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosGComponent } from '../productosG/productosG.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  imports: [
    CommonModule,
    GaleriaComponent,
    RouterModule,
    ReactiveFormsModule,
    ProductosGComponent,
    ContactoComponent,
    BreadcrumbModule,
  ],

  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
})
export class InicioComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'amigurumis' },
      { label: 'ropa' },
      { label: 'Accesorios' },
      { label: 'maletas' },
      { label: 'moñas' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
