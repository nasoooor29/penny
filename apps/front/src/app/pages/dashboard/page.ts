import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@penny/services';

@Inject(AuthService)
@Component({
  selector: 'app-page',
  imports: [CommonModule],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {
  myData = '';
  constructor(auth: AuthService) {
    // Simulate fetching data from the server
    const info = auth.me().subscribe({
      next: (data) => {
        this.myData = data.username;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }
}
