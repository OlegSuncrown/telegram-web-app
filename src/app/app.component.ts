import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { EMPTY, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, SpinnerComponent],
})
export class AppComponent {
  userName = signal(window.Telegram.WebApp?.initDataUnsafe?.user?.first_name);
  isAuthenticated = signal(!!window.Telegram.WebApp?.initDataUnsafe?.user);
  apiService = inject(ApiService);
  isLoading = signal(false);
  error = signal('');
  counter$ = this.apiService.countUsers();

  onSubmit() {
    this.isLoading.set(true);
    this.error.set('');
    this.apiService.submit().pipe(
      catchError((e) => {
        if(e.message) {
          this.error.set(e.error?.message);
        }
        return EMPTY;
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe();
  }
}
