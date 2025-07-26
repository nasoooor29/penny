// validation-message.component.ts
import { Component, Input } from '@angular/core';
import { ZodIssue } from 'zod';

import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-validation-message',
  template: `
    <small *ngIf="errors?.length" class="p-error validation-message">
      <div *ngFor="let err of errors">{{ err.message }}</div>
    </small>
  `,
  styles: [
    `
      .validation-message {
        color: red;
        padding-top: 0.25rem;
        font-size: 0.875rem;
      }
    `,
  ],
  standalone: true,
})
export class ValidationMessage {
  @Input() errors: ZodIssue[] | null = null;
}
