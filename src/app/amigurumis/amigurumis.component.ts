import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-galeria',
  templateUrl: './amigurumis.component.html',
  styleUrls: ['./amigurumis.component.css'],
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
})
export class GaleriaComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  productos = [
    {
      nombre: 'Amigurumi',
      imagen: 'assets/img/amigurumi.png',
    },
    {
      nombre: 'ropa a crochet',
      imagen: 'assets/img/ropa.jpg',
    },
    {
      nombre: 'macrame',
      imagen: 'assets/img/macrame.png',
    },
    {
      nombre: 'Hilos',
      imagen: 'assets/img/hilos.jpg',
    },
    {
      nombre: 'Moñas',
      imagen: 'assets/img/moñas.png',
      descripcion: '',
    },
  ];
  constructor(private carritoService: CarritoService) {}

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

  irCarrito(item: any) {
    console.log('Agregado al carrito:', item);
    this.carritoService.agregarProducto(item);
  }
}
