import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@penny/services';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { CreateProductDtoSchema } from '@penny/shared-validation';
import { ZodIssue } from 'zod';
import { ValidationMessage } from '../validation-message/validation-message';

@Inject(ProductService)
@Inject(MessageService)
@Component({
  standalone: true,
  selector: 'lib-product-create',
  imports: [
    CommonModule,
    FormsModule,
    Card,
    MessageModule,
    ButtonModule,
    TextareaModule,
    InputTextModule,
    ValidationMessage,
  ],
  templateUrl: './product-create.html',
  styleUrl: './product-create.scss',
})
export class ProductCreate {
  name = '';
  description = '';
  price = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  validationErrors: Record<string, ZodIssue[]> = {};
  validate() {
    const res = CreateProductDtoSchema.safeParse({
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
    console.log('Creating product with DTO:', dto);
    this.productService.create(dto).subscribe({
      next: (product) => {
        console.log('Product created:', product);
        // Reset form fields
        this.name = '';
        this.description = '';
        this.price = 0;
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
