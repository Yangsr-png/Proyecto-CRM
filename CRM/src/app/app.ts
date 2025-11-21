import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [RouterOutlet] // Importante para que funcione el <router-outlet>
})
export class App {
  protected readonly title = signal('CRM');
}