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
    return window?.Telegram?.WebApp?.initDataUnsafe;
  }
  
  getData() {
    const url = `api/helloworld`;
    return this.http.get<any>(url);
  }
  constructor() { }
}
