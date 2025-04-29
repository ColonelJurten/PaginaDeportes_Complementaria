import { Component } from '@angular/core';
import { Equipo } from '../../Models/equipo.model';
import { EquiposService } from '../../services/equipos.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {
  // PROPIEDADES
  equipos: Equipo[] = [];
  equipo: Equipo = {} as Equipo;
  selectedFile!: File;
  mostrarErrores: boolean = false;
  intentadoAgregar: boolean = false; // 🔥 Nueva propiedad de control

  constructor(private equiposService: EquiposService) {
    this.getEquipos();
  }

  // MÉTODO PARA OBTENER TODOS LOS EQUIPOS
  async getEquipos(): Promise<void> {
    this.equipos = await firstValueFrom(this.equiposService.getEquipos());
  }

  // MÉTODO PARA INSERTAR UN NUEVO EQUIPO
  insertarEquipo() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de agregar el equipo.');
        this.intentadoAgregar = true;
      }
      return;
    }

    this.equiposService.agregarEquipo(this.equipo);
    this.getEquipos();
    this.resetFormulario();
  }

  // MÉTODO PARA SELECCIONAR UN EQUIPO
  selectEquipo(equipoSeleccionado: Equipo) {
    this.equipo = { ...equipoSeleccionado };
  }

  // MÉTODO PARA MODIFICAR UN EQUIPO
  updateEquipo() {
    if (!this.validarFormulario()) {
      if (!this.intentadoAgregar) {
        alert('Por favor completa todos los campos antes de modificar el equipo.');
        this.intentadoAgregar = true;
      }
      return;
    }

    if (this.equipo.id) {
      this.equiposService.modificarEquipo(this.equipo);
      this.getEquipos();
      this.resetFormulario();
    }
  }

  // MÉTODO PARA ELIMINAR UN EQUIPO
  deleteEquipo() {
    if (this.equipo.id) {
      this.equiposService.eliminarEquipo(this.equipo);
      this.getEquipos();
      this.resetFormulario();
    }
  }

  // MÉTODO PARA VALIDAR FORMULARIO
  validarFormulario(): boolean {
    return (
      this.equipo.nombre?.trim() !== '' &&
      this.equipo.ciudad?.trim() !== '' &&
      this.equipo.fundacion !== null &&
      this.equipo.fundacion !== undefined &&
      this.equipo.estadio?.trim() !== '' &&
      this.equipo.entrenador?.trim() !== ''
    );
  }

  // CAPTURAR Y CONVERTIR ARCHIVO A BASE64
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.equipo.logoURL = reader.result as string; // Aquí queda en base64
      };
      reader.readAsDataURL(file);
    }
  }

  // MÉTODO PARA RESETEAR EL FORMULARIO
  private resetFormulario() {
    this.equipo = {} as Equipo;
    this.selectedFile = undefined!;
    this.intentadoAgregar = false; // 🔥 Resetear intento de alerta al limpiar formulario
  }
  
}