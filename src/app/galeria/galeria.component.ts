import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class GaleriaComponent implements OnInit {
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

  ngOnInit() {}

  irCarrito(item:any){
    console.log('Agregado al carrito:',item)
    this.carritoService.agregarProducto(item);
  }
}
