import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ProductosService } from '../administrador/servicios/productos.service';

@Component({
  selector: 'app-productosG',
  templateUrl: './productosG.component.html',
  styleUrls: ['./productosG.component.css'],
  imports: [CommonModule, ButtonModule, CarouselModule],
  standalone: true,
  providers: [ProductosService],
})
export class ProductosGComponent implements OnInit {
  productos: any[] = [];
  responsiveOptions: any[] | undefined;
  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
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
