import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }
}
