import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProductosService } from './servicios/productos.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ProductosService, MessageService, ConfirmationService],
})
export class AdministradorComponent implements OnInit {
  productos: any[] = [];
  productoForm!: FormGroup;
  productoDialog = false;
  imagenPreview: string | ArrayBuffer | null = null;
  imagenBase64: string | null = null;
  visibleEditar = false;
  productoSeleccionado: any;
  dialogTitle = 'Nuevo producto';
  nombreUsuario: string | null = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: [''],
    });
  }

  ngOnInit() {
    this.cargarProductos();
    this.nombreUsuario = localStorage.getItem('nombreAdmin');
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

  // Convertir archivo a base64
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
        this.imagenPreview = this.imagenBase64;
      };
      reader.readAsDataURL(file);
    }
  }

  // Abrir modal para crear
  nuevoProducto() {
    this.dialogTitle = 'Nuevo producto';
    this.productoSeleccionado = null;
    this.productoForm.reset({
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
    });
    this.imagenPreview = null;
    this.imagenBase64 = null;
    this.productoDialog = true;
  }

  // Guardar o actualizar
  guardarProducto() {
    const productoData = {
      ...this.productoForm.value,
      imagen: this.imagenBase64,
    };

    if (this.productoSeleccionado) {
      // 🔹 Actualizar producto existente
      this.productosService
        .actualizarProducto(this.productoSeleccionado.id_producto, productoData)
        .subscribe({
          next: (res) => {
            const index = this.productos.findIndex(
              (p) => p.id_producto === this.productoSeleccionado.id_producto
            );
            if (index !== -1) this.productos[index] = res;

            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Producto actualizado correctamente',
              life: 3000,
            });
            this.productoDialog = false;
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el producto',
              life: 3000,
            });
          },
        });
    } else {
      // 🔹 Crear nuevo producto
      this.productosService.crearProducto(productoData).subscribe({
        next: (nuevo) => {
          this.productos.push(nuevo);
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Producto agregado correctamente',
            life: 3000,
          });
          this.productoDialog = false;
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el producto',
            life: 3000,
          });
        },
      });
    }
  }

  cancelar() {
    this.productoDialog = false;
  }

  // Abrir modal para editar
  editarProducto(producto: any) {
    this.dialogTitle = 'Editar producto';
    this.productoSeleccionado = producto;
    this.productoForm.patchValue(producto);
    this.imagenPreview = producto.imagen;
    this.imagenBase64 = producto.imagen;
    this.productoDialog = true;
  }

  eliminarProducto(producto: any) {
    console.log('entra?');

    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar el producto <strong>${producto.nombre}</strong>?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.productosService.eliminarProducto(producto.id_producto).subscribe({
          next: () => {
            this.productos = this.productos.filter(
              (p) => p.id_producto !== producto.id_producto
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Producto eliminado correctamente',
              life: 3000,
            });
          },
          error: (err: any) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el producto',
              life: 3000,
            });
          },
        });
      },
    });
  }

  cerrarSesion() {
    console.log('pasa por aqui');
     localStorage.removeItem('nombreAdmin');
    this.router.navigate(['/inicio']);
  }
}
