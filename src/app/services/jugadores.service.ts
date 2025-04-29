import { inject, Injectable } from '@angular/core';
import { Jugador } from '../Models/jugador.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  // MÉTODO PARA OBTENER TODOS LOS JUGADORES
  getJugadores() {
    const jugadoresCollection = collection(this.db, 'jugadores');
    return collectionData(jugadoresCollection, { idField: 'id' }).pipe(first());
  }

  // MÉTODO PARA AGREGAR UN NUEVO JUGADOR
  agregarJugador(jugador: Jugador) {
    const jugadoresCollection = collection(this.db, 'jugadores');
    const jugadorData = {
      nombre: jugador.nombre,
      edad: jugador.edad,
      posicion: jugador.posicion,
      nacionalidad: jugador.nacionalidad,
      numero: jugador.numero,
      equipo: jugador.equipo
    };
    return addDoc(jugadoresCollection, jugadorData);
  }

  // MÉTODO PARA MODIFICAR UN JUGADOR EXISTENTE
  modificarJugador(jugador: Jugador) {
    const documentRef = doc(this.db, 'jugadores', jugador.id!);
    return updateDoc(documentRef, {
      nombre: jugador.nombre,
      edad: jugador.edad,
      posicion: jugador.posicion,
      nacionalidad: jugador.nacionalidad,
      numero: jugador.numero,
      equipo: jugador.equipo
    });
  }

  // MÉTODO PARA BORRAR UN JUGADOR
  eliminarJugador(jugador: Jugador) {
    const documentRef = doc(this.db, 'jugadores', jugador.id!);
    return deleteDoc(documentRef);
  }
}