import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZodIssue, ZodSchema } from 'zod';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ValidationMessage } from '@penny/ui';
import { env, loginSchema, User } from '@penny/shared-validation';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

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
    private httpClient: HttpClient // Assuming you have HttpClient injected for API calls
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
    // this.loading = true;

    // console.log('Logging in with:', this.username, this.password);
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Login Successful',
    //   detail: `Welcome, ${this.username}!`,
    // });

    this.httpClient
      .post<User>(`${env.apiBaseUrl}/api/auth/login`, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (value) => {
          console.log('Login successful:', value);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome, ${value.username}!`,
          });
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'Unknown error',
          });
        },
      });
  }
}
