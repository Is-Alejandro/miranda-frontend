import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boleto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss'],
})
export class BoletoComponent implements OnInit {
  origen = '';
  destino = '';
  fecha = '';
  pasajeros = 1;
  asiento: string | null = null;

  nombre = '';
  dni = '';
  telefono = '';
  correo = '';
  metodoPago = '';

  codigoReserva = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.origen = params.get('origen') ?? '';
    this.destino = params.get('destino') ?? '';
    this.fecha = params.get('fecha') ?? '';
    this.pasajeros = Number(params.get('pasajeros') ?? 1);
    this.asiento = params.get('asiento');

    this.nombre = params.get('nombre') ?? '';
    this.dni = params.get('dni') ?? '';
    this.telefono = params.get('telefono') ?? '';
    this.correo = params.get('correo') ?? '';
    this.metodoPago = (params.get('metodoPago') ?? '').toString();

    this.generarCodigoReserva();
  }

  generarCodigoReserva(): void {
    const fechaBase = this.fecha.replace(/-/g, '');
    const asiento = this.asiento ?? '0';
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.codigoReserva = `MIR-${fechaBase}-${asiento}-${random}`;
  }

  enviarCorreo(): void {
    alert(`Se envió el boleto virtual al correo: ${this.correo}`);
  }

  irAlHome(): void {
    this.router.navigate(['/home']);
  }
}
