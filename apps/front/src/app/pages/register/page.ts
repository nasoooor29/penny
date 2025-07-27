import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env, registrationSchema, User } from '@penny/shared-validation';
import { ZodIssue } from 'zod';
import { Card, CardModule } from 'primeng/card';
import { ValidationMessage } from '@penny/ui';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Inject(MessageService)
@Component({
  selector: 'app-page',
  imports: [
    CommonModule,
    Card,
    ValidationMessage,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  loading = false;
  validationErrors: Record<string, ZodIssue[]> = {};
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
    private router: Router
  ) {}
  validate() {
    const res = registrationSchema.safeParse({
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
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
        summary: 'Validation Error front',
        detail: 'Please fix the errors before submitting.',
      });
      return;
    }
    this.loading = true;

    // console.log('Logging in with:', this.username, this.password);
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Login Successful',
    //   detail: `Welcome, ${this.username}!`,
    // });

    this.httpClient
      .post<User>(`${env.apiBaseUrl}/api/auth/register`, {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .subscribe({
        next: (value) => {
          console.log('Login successful:', value);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome, ${value.username}!`,
          });
          this.loading = false;
          this.router.navigate(['/']);
          console.log('User data:', value);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'Unknown error',
          });
          this.loading = false;
        },
      });
  }
}
