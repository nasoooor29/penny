import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ProductService } from '@penny/services';
import { MessageService } from 'primeng/api';
import { ZodIssue } from 'zod';
import { Product, UpdateProductDtoSchema } from '@penny/shared-validation';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Card, CardModule } from 'primeng/card';
import { ValidationMessage } from '../validation-message/validation-message';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Inject(AuthService)
@Component({
  selector: 'lib-product-edit',
  imports: [
    CommonModule,
    Card,
    ValidationMessage,
    FormsModule,
    CardModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    Message,
    RouterModule,
  ],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss',
})
export class ProductEdit {
  name = '';
  description = '';
  price = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  id: string;
  product: Product | null = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private auth: AuthService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }
  ngOnInit() {
    if (!this.id) {
      console.error('Product ID is not provided in the route.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product ID is missing.',
      });
      this.router.navigate(['/products']);
      return;
    }
    if (!this.auth.currentUser()) {
      console.error('User is not authenticated.');
      this.messageService.add({
        severity: 'error',
        summary: 'Authentication Error',
        detail: 'You must be logged in to edit a product.',
      });
      this.router.navigate(['/login']);
      return;
    }
    this.productService.getById(this.id).subscribe({
      next: (data) => {
        this.product = data;
        this.name = data.name;
        this.description = data.description || '';
        this.price = data.price;
      },
      error: (err) => {
        console.error(`Error fetching product with ID ${this.id}:`, err);
      },
    });
  }

  validationErrors: Record<string, ZodIssue[]> = {};
  validate() {
    const res = UpdateProductDtoSchema.safeParse({
      name: this.name,
      description: this.description,
      price: this.price,
    });
    if (!res.success) {
      this.validationErrors = {};
      for (const issue of res.error.issues) {
        const key = issue.path[0] as string;
        if (!this.validationErrors[key]) {
          this.validationErrors[key] = [];
        }
        this.validationErrors[key].push(issue as ZodIssue);
        return false; // Validation failed
      }
    } else {
      this.validationErrors = {};
      return true; // Validation passed
    }
    return false; // Default case if no issues found
  }

  onSubmit() {
    if (!this.validate()) {
      console.error('Validation failed:', this.validationErrors);
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please correct the errors in the form.',
      });
      return; // Stop submission if validation fails
    }
    const dto = {
      name: this.name,
      description: this.description,
      price: this.price,
    };
    this.productService.update(this.id, dto).subscribe({
      next: (product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Updated',
          detail: `Product ${product.name} updated successfully!`,
        });
        this.router.navigate(['/products', product._id]);
      },
      error: (error) => {
        console.error('Error creating product:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Product Creation Failed',
          detail:
            error.error?.message ||
            'An error occurred while creating the product.',
        });
      },
    });
  }
}
