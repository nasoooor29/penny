import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Product } from '@penny/shared-validation';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductService } from '@penny/services';

@Inject(ProductService)
@Component({
  selector: 'lib-product-card',
  imports: [CommonModule, CardModule, ButtonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  @Output() deleted = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  onDelete(id: string) {
    this.productService.delete(id).subscribe({
      next: () => {
        console.log(`Product with ID ${id} deleted successfully.`);
        this.deleted.emit(); // Notify parent to refetch
      },
      error: (err) => {
        console.error(`Error deleting product with ID ${id}:`, err);
      },
    });
  }
}
