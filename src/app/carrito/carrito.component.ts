import { Component, OnInit } from '@angular/core';
import { CarritoService } from './carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    // Nos suscribimos al observable del carrito
    this.carritoService.carrito$.subscribe((productos) => {
      this.carrito = productos;
      console.log('Carrito actualizado:', this.carrito);
    });
  }

  pedirProductos() {
    console.log('Pedido realizado con los siguientes productos:', this.carrito);
    alert('¡Tu pedido ha sido enviado!');
  }
}
