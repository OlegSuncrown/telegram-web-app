import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { Telegram } from '@twa-dev/types';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  countUsers() {
    const hash = window?.Telegram?.WebApp?.initData;
    const url = `/api/count-users`;
    const payload = { hash };
    return this.http.post(url, payload).pipe(take(1));
  };

  submit() {
    const hash = window?.Telegram?.WebApp?.initData;
    const url = `/api/telegram-user`;
    const {
      query_id,
      chat: { id: chat_id } = {},
      user: { id: user_id, is_bot, first_name, last_name, username, photo_url } = {},
    } = window.Telegram.WebApp?.initDataUnsafe;

    const telegramUser = { query_id, chat_id, user_id, is_bot, first_name, last_name, username, photo_url };
    const payload = { hash, telegramUser };
    return this.http.post(url, payload).pipe(take(1));
  }
}
