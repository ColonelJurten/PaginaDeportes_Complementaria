import { Component } from '@angular/core';
import { Arbitro } from '../../Models/arbitro.model';
import { ArbitrosService } from '../../services/arbitros.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arbitros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent {
  arbitros: any[] = [];
  arbitro: Arbitro = {} as Arbitro;
  intentadoAgregar: boolean = false;

  constructor(private arbitrosService: ArbitrosService) {
    this.getArbitros();
  }

  async getArbitros(): Promise<void> {
    this.arbitros = await firstValueFrom(this.arbitrosService.getArbitros());
  }

  insertarArbitro() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de agregar el árbitro.');
        this.intentadoAgregar = true;
      }
      return;
    }

    this.arbitrosService.agregarArbitro(this.arbitro);
    this.getArbitros();
    this.resetFormulario();
  }

  selectArbitro(arbitroSeleccionado: Arbitro) {
    this.arbitro = { ...arbitroSeleccionado };
  }

  updateArbitro() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de modificar el árbitro.');
        this.intentadoAgregar = true;
      }
      return;
    }

    if (this.arbitro.id) {
      this.arbitrosService.modificarArbitro(this.arbitro);
      this.getArbitros();
      this.resetFormulario();
    }
  }

  deleteArbitro() {
    if (this.arbitro.id) {
      this.arbitrosService.eliminarArbitro(this.arbitro);
      this.getArbitros();
      this.resetFormulario();
    }
  }

  validarFormulario(): boolean {
    return (
      this.arbitro.nombre?.trim() !== '' &&
      this.arbitro.edad !== null &&
      this.arbitro.edad !== undefined &&
      this.arbitro.especialidad?.trim() !== '' &&
      this.arbitro.experiencia !== null &&
      this.arbitro.experiencia !== undefined &&
      this.arbitro.activo !== null &&
      this.arbitro.activo !== undefined
    );
  }  

  private resetFormulario() {
    this.arbitro = {} as Arbitro;
    this.intentadoAgregar = false;
  }
}