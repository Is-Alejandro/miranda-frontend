import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  nombreUsuario: string = '';

  // 🔎 Formulario de búsqueda de viajes
  searchForm!: FormGroup;

  // Por ahora, destinos fijos (más adelante vendrán del backend)
  terminales = ['Lima', 'Chimbote'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user?.nombre ?? 'Usuario';

    this.searchForm = this.fb.group({
      origen: ['Lima', Validators.required],
      destino: ['Chimbote', Validators.required],
      fecha: ['', Validators.required],
      pasajeros: [
        1,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const valores = this.searchForm.value;

    // 👉 Navegar a /viajes con los filtros como query params
    this.router.navigate(['/viajes'], {
      queryParams: {
        origen: valores.origen,
        destino: valores.destino,
        fecha: valores.fecha,
        pasajeros: valores.pasajeros,
      },
    });
  }
}
