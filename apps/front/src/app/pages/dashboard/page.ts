import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ProductService } from '@penny/services';
import { tap } from 'rxjs';
import { Product } from '@penny/shared-validation';
import { ProductCard } from '@penny/ui';
import { MessageService } from 'primeng/api';

@Inject(AuthService)
@Inject(ProductService)
@Inject(MessageService)
@Component({
  selector: 'app-page',
  imports: [CommonModule, ProductCard],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {
  products: Product[] = [];

  constructor(
    private auth: AuthService,
    private product: ProductService,
    private messageService: MessageService
  ) {
    this.auth.me().subscribe((u) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Welcome',
        detail: `Hello, ${u.username}! You are logged in.`,
      });
    });

    this.fetchProducts();
  }

  fetchProducts() {
    this.product
      .getAll()
      .pipe(tap((data) => (this.products = data)))
      .subscribe();
  }
}
