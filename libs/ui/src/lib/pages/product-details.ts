import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '@penny/shared-validation';
import { ProductService } from '@penny/services';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Inject(ProductService)
@Component({
  selector: 'lib-product-details',
  imports: [CommonModule, Card, ButtonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
  standalone: true,
})
export class ProductDetails {
  id: string;
  product: Product | null = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }
  ngOnInit() {
    this.productService.getById(this.id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error(`Error fetching product with ID ${this.id}:`, err);
      },
    });
  }
}
