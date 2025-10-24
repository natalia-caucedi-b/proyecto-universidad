import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule
  ]
})
export class RegistroComponent implements OnInit {
  nombre: string = '';
  correo: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('RegistroComponent inicializado');
  }

  siguiente() {
    console.log('Datos registrados:', this.nombre, this.correo);
    alert(`Bienvenido/a ${this.nombre}`);
  }
}

