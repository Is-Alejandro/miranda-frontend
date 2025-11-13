import { Injectable } from '@angular/core';

export interface AuthUser {
  email: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'miranda_user';

  // Usuario simulado (más adelante vendrá del backend Spring Boot)
  private readonly MOCK_USER = {
    email: 'admin@miranda.com',
    password: '123456',
    nombre: 'Administrador Miranda',
  };

  login(email: string, password: string): boolean {
    const isValid =
      email === this.MOCK_USER.email && password === this.MOCK_USER.password;

    if (isValid) {
      const userData: AuthUser = {
        email: this.MOCK_USER.email,
        nombre: this.MOCK_USER.nombre,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }

    return isValid;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? (JSON.parse(data) as AuthUser) : null;
  }
}
