import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // declaramos la propiedad sin inicializar
  loginForm!: FormGroup;

  errorMsg = '';
  returnUrl = '/home';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // aquí ya tenemos fb disponible y creamos el formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    if (url) {
      this.returnUrl = url;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const ok = this.authService.login(email!, password!);

    if (ok) {
      this.errorMsg = '';
      alert('Inicio de sesión exitoso');
      this.router.navigate([this.returnUrl]);
    } else {
      this.errorMsg = 'Credenciales incorrectas';
    }
  }
}
