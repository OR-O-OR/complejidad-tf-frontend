import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Centralidad App');
  protected readonly showIntro = signal(true);

  enterApp(): void {
    this.showIntro.set(false);
  }
}
