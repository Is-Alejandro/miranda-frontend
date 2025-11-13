import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Viaje {
  id: number;
  origen: string;
  destino: string;
  fecha: string;        // yyyy-mm-dd
  horaSalida: string;
  horaLlegada: string;
  empresa: string;
  precio: number;
  duracionHoras: number;
  asientosDisponibles: number;
}

@Component({
  selector: 'app-lista-viajes',
  standalone: true,
  imports: [CommonModule], // 👈 Necesario para *ngIf y *ngFor
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.scss'],
})
export class ListaViajesComponent {
  // Filtros que vienen desde la URL
  filtros = {
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: 1,
  };

  // Lista completa simulada y lista filtrada
  viajes: Viaje[] = [];
  viajesFiltrados: Viaje[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Leer filtros desde los query params
    const qp = this.route.snapshot.queryParamMap;
    this.filtros.origen = qp.get('origen') ?? '';
    this.filtros.destino = qp.get('destino') ?? '';
    this.filtros.fecha = qp.get('fecha') ?? '';
    this.filtros.pasajeros = Number(qp.get('pasajeros') ?? 1);

    this.initViajesSimulados();
    this.aplicarFiltros();
  }

  // Carga de viajes simulados (luego vendrá de la API)
  initViajesSimulados(): void {
    this.viajes = [
      {
        id: 1,
        origen: 'Lima',
        destino: 'Chimbote',
        fecha: this.filtros.fecha || '2025-12-01',
        horaSalida: '08:00',
        horaLlegada: '14:00',
        empresa: 'Transporte Miranda',
        precio: 80,
        duracionHoras: 6,
        asientosDisponibles: 15,
      },
      {
        id: 2,
        origen: 'Lima',
        destino: 'Chimbote',
        fecha: this.filtros.fecha || '2025-12-01',
        horaSalida: '10:00',
        horaLlegada: '16:00',
        empresa: 'Transporte Miranda',
        precio: 70,
        duracionHoras: 6,
        asientosDisponibles: 8,
      },
      {
        id: 3,
        origen: 'Chimbote',
        destino: 'Lima',
        fecha: this.filtros.fecha || '2025-12-01',
        horaSalida: '21:00',
        horaLlegada: '05:00',
        empresa: 'Transporte Miranda',
        precio: 90,
        duracionHoras: 8,
        asientosDisponibles: 20,
      },
    ];
  }

  aplicarFiltros(): void {
    this.viajesFiltrados = this.viajes.filter((v) => {
      const coincideOrigen =
        !this.filtros.origen || v.origen === this.filtros.origen;
      const coincideDestino =
        !this.filtros.destino || v.destino === this.filtros.destino;
      return coincideOrigen && coincideDestino;
    });
  }

  volverAlHome(): void {
    this.router.navigate(['/home']);
  }

  // ✅ NUEVO: navegar a la pantalla de asientos
  irASeleccionAsientos(viaje: Viaje): void {
    const queryParams = { ...this.route.snapshot.queryParams };

    this.router.navigate(
      ['/viajes', viaje.id, 'asientos'],
      { queryParams }
    );
  }
}
