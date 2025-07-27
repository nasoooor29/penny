import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Product } from '@penny/shared-validation';

@Component({
  selector: 'lib-product-card',
  imports: [CommonModule, CardModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
}
