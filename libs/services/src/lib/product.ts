import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateProductDto,
  UpdateProductDto,
  Product,
  env,
} from '@penny/shared-validation';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${env.apiBaseUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl, { withCredentials: true });
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto, {
      withCredentials: true,
    });
  }

  update(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, dto, {
      withCredentials: true,
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
