import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  // Permite obtener los productos
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Permite la cracion de los productos
  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  // Permite actualizar los productos
  actualizarProducto(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  // Permite eliminar los productos
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
