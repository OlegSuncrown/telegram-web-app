import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

declare global {
  interface Window {
    Telegram: any;
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
  
  getData() {
    const url = `api/helloworld`;
    return this.http.get<any>(url);
  }

  getTelegramUser() {
    const hash = window?.Telegram?.WebApp?.initData;
    const url = `/api/telegram-validate`;
    const data = {
      hash,
    };
    return this.http.post(url, data);
  }

  constructor() { }
}
