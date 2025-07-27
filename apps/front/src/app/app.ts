import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NavBar } from '@penny/ui';

@Component({
  imports: [RouterModule, ToastModule, NavBar],
  providers: [],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'front';
}
