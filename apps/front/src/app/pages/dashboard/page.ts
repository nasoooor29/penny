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
    auth: AuthService,
    product: ProductService,
    messageService: MessageService
  ) {
    console.log('AuthService:', auth);
    console.log('ProductService:', product);
    auth.me().subscribe((u) => {
      messageService.add({
        severity: 'info',
        summary: 'Welcome',
        detail: `Hello, ${u.username}! You are logged in.`,
      });
    });

    product.getAll().pipe(
      tap((data) => {
        this.products = data;
      })
    );
  }
}
