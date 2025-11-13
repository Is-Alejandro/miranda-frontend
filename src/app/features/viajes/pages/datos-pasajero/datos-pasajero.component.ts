import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datos-pasajero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datos-pasajero.component.html',
  styleUrls: ['./datos-pasajero.component.scss'],
})
export class DatosPasajeroComponent implements OnInit {

  // Datos del viaje
  origen = '';
  destino = '';
  fecha = '';
  pasajeros = 1;
  asiento: string | null = null;

  // Formulario de pasajero
  formData = {
    nombre: '',
    dni: '',
    telefono: '',
    correo: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.origen = params.get('origen') ?? '';
    this.destino = params.get('destino') ?? '';
    this.fecha = params.get('fecha') ?? '';
    this.pasajeros = Number(params.get('pasajeros') ?? 1);
    this.asiento = params.get('asiento');
  }

  volver(): void {
    // Volver a selección de asientos manteniendo filtros
    const qp = { ...this.route.snapshot.queryParams };
    const id = this.route.snapshot.paramMap.get('id') ?? '1';

    this.router.navigate(
      ['/viajes', id, 'asientos'],
      { queryParams: qp }
    );
  }

  continuar(): void {
    const params = this.route.snapshot.queryParams;

    // Navegamos a la pantalla de pago enviando todo
    this.router.navigate(
      ['/pago'],
      {
        queryParams: {
          ...params,
          ...this.formData,
        },
      }
    );
  }
}
