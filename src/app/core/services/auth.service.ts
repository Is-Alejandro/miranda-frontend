import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usuario simulado (más adelante esto se reemplaza por el backend Spring)
  private readonly MOCK_USER = {
    email: 'admin@miranda.com',
    password: '123456',
    nombre: 'Administrador Miranda',
  };

  login(email: string, password: string): boolean {
    const isValid =
      email === this.MOCK_USER.email && password === this.MOCK_USER.password;

    if (isValid) {
      const userData = {
        email: this.MOCK_USER.email,
        nombre: this.MOCK_USER.nombre,
      };
      localStorage.setItem('miranda_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('miranda_user');
    }

    return isValid;
  }

  logout(): void {
    localStorage.removeItem('miranda_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('miranda_user');
  }
}
