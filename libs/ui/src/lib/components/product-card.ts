import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Product } from '@penny/shared-validation';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ProductService } from '@penny/services';
import { MessageService } from 'primeng/api';

@Inject(AuthService)
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

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private auth: AuthService,
    private router: Router
  ) {}

  onDelete(id: string) {
    if (!this.auth.currentUser()) {
      console.error('User is not authenticated. Cannot delete product.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must be logged in to delete a product.',
      });
      this.router.navigate(['/login']);
      return;
    }
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
