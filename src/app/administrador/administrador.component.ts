import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
})
export class AdministradorComponent implements OnInit {
  productos = [
    {
      nombre: 'Amigurumi de gato',
      imagen: 'assets/img/amigurumis.jpg',
      descripcion: 'Hecho a mano con hilo de algodón suave.',
    },
    {
      nombre: 'Bolsito morado',
      imagen: 'assets/img/buf.jpg',
      descripcion: 'Ideal para llevar tus objetos pequeños con estilo.',
    },
    {
      nombre: 'Top tejido lavanda',
      imagen: 'assets/img/CROCHET.jpg',
      descripcion: 'Perfecto para el verano, talla S-M.',
    },
    {
      nombre: 'Top tejido lavanda',
      imagen: 'assets/img/CROCHET.jpg',
      descripcion: 'Perfecto para el verano, talla S-M.',
    },
    {
      nombre: 'Top tejido lavanda',
      imagen: 'assets/img/CROCHET.jpg',
      descripcion: 'Perfecto para el verano, talla S-M.',
    },
  ];

  productoForm!: FormGroup;
  productoDialog = false;
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: [''],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result;
      this.productoForm.patchValue({
        imagen: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  mostrarDialog() {
    this.productoForm.reset();
    this.imagenPreview = null;
    this.productoDialog = true;
  }

   guardarProducto() {
    if (this.productoForm.valid) {
      this.productos.push(this.productoForm.value);
      this.productoDialog = false;
      console.log(this.productos)
    }
  }

  cancelar() {
    this.productoDialog = false;
  }

  editarProducto(producto: any) {
    // Aquí puedes implementar la lógica para editar (rellenar el formulario y abrir el modal)
    console.log('Editar', producto);
  }

  eliminarProducto(producto: any) {
    this.productos = this.productos.filter((p) => p !== producto);
  }

  cerrarSesion() {   
    console.log("pasa por aqui")
    this.router.navigate(['/inicio']); 
  }
  }
