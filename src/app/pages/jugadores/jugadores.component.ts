import { Component } from '@angular/core';
import { Jugador } from '../../Models/jugador.model';
import { JugadoresService } from '../../services/jugadores.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent {
  jugadores: any[] = [];
  jugador: Jugador = {} as Jugador;
  intentadoAgregar: boolean = false;

  constructor(private jugadoresService: JugadoresService) {
    this.getJugadores();
  }

  async getJugadores(): Promise<void> {
    this.jugadores = await firstValueFrom(this.jugadoresService.getJugadores());
  }

  insertarJugador() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de agregar el jugador.');
        this.intentadoAgregar = true;
      }
      return;
    }

    this.jugadoresService.agregarJugador(this.jugador);
    this.getJugadores();
    this.resetFormulario();
  }

  selectJugador(jugadorSeleccionado: Jugador) {
    this.jugador = { ...jugadorSeleccionado };
  }

  updateJugador() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de modificar el jugador.');
        this.intentadoAgregar = true;
      }
      return;
    }

    if (this.jugador.id) {
      this.jugadoresService.modificarJugador(this.jugador);
      this.getJugadores();
      this.resetFormulario();
    }
  }

  deleteJugador() {
    if (this.jugador.id) {
      this.jugadoresService.eliminarJugador(this.jugador);
      this.getJugadores();
      this.resetFormulario();
    }
  }

  validarFormulario(): boolean {
    return (
      this.jugador.nombre?.trim() !== '' &&
      this.jugador.posicion?.trim() !== '' &&
      this.jugador.numero !== null &&
      this.jugador.numero !== undefined &&
      this.jugador.edad !== null &&
      this.jugador.edad !== undefined &&
      this.jugador.equipo?.trim() !== ''
    );
  }

  private resetFormulario() {
    this.jugador = {} as Jugador;
    this.intentadoAgregar = false;
  }
}
