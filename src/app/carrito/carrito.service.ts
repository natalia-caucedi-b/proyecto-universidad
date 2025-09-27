import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}

  private carrito: any[] = [];
  private carritoSubject = new BehaviorSubject<any[]>([]);

  // Observable público
  carrito$ = this.carritoSubject.asObservable();

  agregarProducto(producto: any) {
    this.carrito.push(producto);
    this.carritoSubject.next([...this.carrito]); // emitimos copia del array
  }

  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next([...this.carrito]);
  }
}
