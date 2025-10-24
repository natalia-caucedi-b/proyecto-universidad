import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { ButtonModule, ButtonDirective } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';
import { ProductosService } from '../administrador/servicios/productos.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [ProductosService],
})
export class GaleriaComponent implements OnInit {
  productos: any[] = [];
  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.cargarProductos();
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

  verMas() {
    console.log('debe llevar a');
    // Redirige al componente Amigurumis
    this.router.navigate(['/amigurumis']);
  }
}
