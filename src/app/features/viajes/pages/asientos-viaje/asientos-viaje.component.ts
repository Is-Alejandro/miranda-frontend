import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Asiento {
  numero: number;
  ocupado: boolean;
}

@Component({
  selector: 'app-asientos-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asientos-viaje.component.html',
  styleUrls: ['./asientos-viaje.component.scss'],
})
export class AsientosViajeComponent implements OnInit {
  viajeId!: number;

  origen = '';
  destino = '';
  fecha = '';
  pasajeros = 1;

  asientos: Asiento[] = [];
  asientoSeleccionado?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // id del viaje desde la ruta
    this.viajeId = Number(this.route.snapshot.paramMap.get('id'));

    // datos desde los query params
    this.route.queryParamMap.subscribe((params) => {
      this.origen = params.get('origen') ?? '';
      this.destino = params.get('destino') ?? '';
      this.fecha = params.get('fecha') ?? '';
      this.pasajeros = Number(params.get('pasajeros') ?? 1);
    });

    this.generarAsientos();
  }

  generarAsientos(): void {
    const total = 40; // número de asientos del bus (ejemplo)
    const ocupadosEjemplo = [3, 7, 10, 15, 22, 30]; // solo simulación

    this.asientos = Array.from({ length: total }, (_, i) => ({
      numero: i + 1,
      ocupado: ocupadosEjemplo.includes(i + 1),
    }));
  }

  seleccionarAsiento(asiento: Asiento): void {
    if (asiento.ocupado) return;
    this.asientoSeleccionado = asiento.numero;
  }

  continuar(): void {
    if (!this.asientoSeleccionado) return;
  
    this.router.navigate(
      ['/viajes', this.viajeId, 'pasajero'],
      {
        queryParams: {
          origen: this.origen,
          destino: this.destino,
          fecha: this.fecha,
          pasajeros: this.pasajeros,
          asiento: this.asientoSeleccionado,
        },
      }
    );
  }  

  volverALaLista(): void {
    // Volver a la lista de viajes manteniendo filtros
    const queryParams = { ...this.route.snapshot.queryParams };
    this.router.navigate(['/viajes'], { queryParams });
  }
}
