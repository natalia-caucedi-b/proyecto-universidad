import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-productosG',
  templateUrl: './productosG.component.html',
  styleUrls: ['./productosG.component.css'],
  imports: [CommonModule, ButtonModule, CarouselModule],
  standalone: true,
})
export class ProductosGComponent implements OnInit {
  productos!: any[];
  responsiveOptions: any[] | undefined;
  constructor() {}

  ngOnInit() {
    this.productos = [
      {
        nombre: 'Hilo nubre color fucsia',
        imagen: 'assets/img/1.jpg',
      },
      {
        nombre: 'Hilo nubre color azul',
        imagen: 'assets/img/2.jpg',
      },
      {
        nombre: 'hilo nube arcoiris',
        imagen: 'assets/img/3.jpg',
      },
      {
        nombre: 'Hilo nube color gris',
        imagen: 'assets/img/4.png',
      },
      {
        nombre: 'Hilo nube color rojo',
        imagen: 'assets/img/5.png',
      },
      {
        nombre: 'felting de mascotas',
        imagen: 'assets/img/felting.jpg',
      },
      {
        nombre: 'gorros a macrame',
        imagen: 'assets/img/gorros.jpg',
      },
    ];
  }
}
