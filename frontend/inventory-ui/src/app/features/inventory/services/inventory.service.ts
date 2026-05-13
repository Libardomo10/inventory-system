import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';
import { Response } from '../../../core/models/response.model';
import { Observable } from 'rxjs';
import { ProductMovement } from '../models/product-movement.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private apiUrl = environment.API_URL;

  getInventory(): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(`${this.apiUrl}/Products/inventario`);
  }

  registerMovement(movement: ProductMovement): Observable<Response<boolean>> {
    return this.http.post<Response<boolean>>(`${this.apiUrl}/Products/movimiento`, movement);
  }
}
