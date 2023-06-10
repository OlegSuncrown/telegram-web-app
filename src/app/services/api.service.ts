import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);

  getData() {
    const url = `api/helloworld`;
    return this.http.get<any>(url);
  }
  constructor() { }
}
