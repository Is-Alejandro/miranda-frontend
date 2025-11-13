import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Definimos el formulario y sus validaciones básicas
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Marca todos los campos como "tocados" para mostrar errores
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value as {
      email: string;
      password: string;
    };

    const success = this.authService.login(email, password);

    if (!success) {
      this.loginError = 'Correo o contraseña incorrectos.';
      return;
    }

    this.loginError = null;
    console.log('✅ Login correcto (simulado)');
    alert('Inicio de sesión exitoso (simulado)');
    // Más adelante: this.router.navigate(['/home']);
  }
}
