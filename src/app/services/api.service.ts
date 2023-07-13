import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Telegram } from "@twa-dev/types"

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);

  telegramData() {
    return window?.Telegram?.WebApp?.initData;
  }
  
  getTelegramUser() {
    const hash = window?.Telegram?.WebApp?.initData;
    const url = `/api/telegram-validate`;
    const data = {
      hash,
    };
    return this.http.post(url, data).pipe(
      map(() => window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Unknown')
    );
  }
}
