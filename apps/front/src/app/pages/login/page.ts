import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZodIssue } from 'zod';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ValidationMessage } from '@penny/ui';
import { loginSchema } from '@penny/shared-validation';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '@penny/services';

@Inject(MessageService)
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ValidationMessage,
  ],
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  providers: [],
})
export class Page {
  username = '';
  password = '';
  loading = false;
  validationErrors: Record<string, ZodIssue[]> = {};
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}
  validate() {
    const res = loginSchema.safeParse({
      username: this.username,
      password: this.password,
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
        detail: 'Please fix the errors before submitting.',
      });
      return;
    }
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
      },
    });

    // console.log('Logging in with:', this.username, this.password);
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Login Successful',
    //   detail: `Welcome, ${this.username}!`,
    // });
  }
}
