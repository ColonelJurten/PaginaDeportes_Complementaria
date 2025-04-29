import { Injectable } from '@angular/core';
import { Equipo } from '../Models/equipo.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private db: Firestore;

  constructor(firestore: Firestore) {
    this.db = firestore;
  }

  // Método para obtener todos los equipos
  getEquipos(): Observable<Equipo[]> {
    const equiposCollection = collection(this.db, 'equipos');
    return collectionData(equiposCollection, { idField: 'id' }) as Observable<Equipo[]>;
  }

  // Método para agregar un equipo
  agregarEquipo(equipo: Equipo) {
    const equiposCollection = collection(this.db, 'equipos');
    const equipoData = {
      nombre: equipo.nombre,
      ciudad: equipo.ciudad,
      fundacion: equipo.fundacion,
      estadio: equipo.estadio,
      entrenador: equipo.entrenador,
      logoURL: equipo.logoURL // 🔥 Aquí guardamos el base64 directamente
    };
    return addDoc(equiposCollection, equipoData);
  }

  // Método para modificar un equipo existente
  modificarEquipo(equipo: Equipo) {
    const documentRef = doc(this.db, 'equipos', equipo.id!);
    return updateDoc(documentRef, {
      nombre: equipo.nombre,
      ciudad: equipo.ciudad,
      fundacion: equipo.fundacion,
      estadio: equipo.estadio,
      entrenador: equipo.entrenador,
      logoURL: equipo.logoURL // 🔥 También actualizamos logo aquí
    });
  }

  // Método para eliminar un equipo
  eliminarEquipo(equipo: Equipo) {
    const documentRef = doc(this.db, 'equipos', equipo.id!);
    return deleteDoc(documentRef);
  }
}
