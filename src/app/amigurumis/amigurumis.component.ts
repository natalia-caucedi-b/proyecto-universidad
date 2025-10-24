import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductosService } from '../administrador/servicios/productos.service';

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
  productos: any[] = [];
  constructor(
    private carritoService: CarritoService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.cargarProductos();
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
  cargarProductos() {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      },
    });
  }
}
