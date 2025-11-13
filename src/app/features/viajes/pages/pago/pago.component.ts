import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent implements OnInit {

  // Datos del viaje
  origen = '';
  destino = '';
  fecha = '';
  pasajeros = 1;
  asiento: string | null = null;

  // Datos del pasajero
  nombre = '';
  dni = '';
  telefono = '';
  correo = '';

  // Pago
  metodoPago: 'tarjeta' | 'yape' | 'plin' | '' = '';
  datosTarjeta = {
    numero: '',
    nombre: '',
    vencimiento: '',
    cvv: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    // Viaje
    this.origen = params.get('origen') ?? '';
    this.destino = params.get('destino') ?? '';
    this.fecha = params.get('fecha') ?? '';
    this.pasajeros = Number(params.get('pasajeros') ?? 1);
    this.asiento = params.get('asiento');

    // Pasajero
    this.nombre = params.get('nombre') ?? '';
    this.dni = params.get('dni') ?? '';
    this.telefono = params.get('telefono') ?? '';
    this.correo = params.get('correo') ?? '';
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'yape' | 'plin'): void {
    this.metodoPago = metodo;
  }

  confirmarPago(): void {
    if (!this.metodoPago) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    if (this.metodoPago === 'tarjeta') {
      if (
        !this.datosTarjeta.numero ||
        !this.datosTarjeta.nombre ||
        !this.datosTarjeta.vencimiento ||
        !this.datosTarjeta.cvv
      ) {
        alert('Por favor, completa todos los datos de la tarjeta.');
        return;
      }
    }

    const params = this.route.snapshot.queryParamMap;

    // 👉 Navegar a /boleto con todos los datos
    this.router.navigate(['/boleto'], {
      queryParams: {
        origen: params.get('origen'),
        destino: params.get('destino'),
        fecha: params.get('fecha'),
        pasajeros: params.get('pasajeros'),
        asiento: params.get('asiento'),
        nombre: params.get('nombre'),
        dni: params.get('dni'),
        telefono: params.get('telefono'),
        correo: params.get('correo'),
        metodoPago: this.metodoPago,
      },
    });
  }

  volver(): void {
    const qp = { ...this.route.snapshot.queryParams };
    this.router.navigate(
      ['/viajes', 1, 'pasajero'], // id 1 de ejemplo
      { queryParams: qp }
    );
  }
}
