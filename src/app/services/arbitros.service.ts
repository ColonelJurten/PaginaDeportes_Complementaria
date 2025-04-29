import { inject, Injectable } from '@angular/core';
import { Arbitro } from '../Models/arbitro.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArbitrosService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  // MÉTODO PARA OBTENER TODOS LOS ÁRBITROS
  getArbitros() {
    const arbitrosCollection = collection(this.db, 'arbitros');
    return collectionData(arbitrosCollection, { idField: 'id' }).pipe(first());
  }

  // MÉTODO PARA AGREGAR UN NUEVO ÁRBITRO
  agregarArbitro(arbitro: Arbitro) {
    const arbitrosCollection = collection(this.db, 'arbitros');
    const arbitroData = {
      nombre: arbitro.nombre,
      edad: arbitro.edad,
      especialidad: arbitro.especialidad,
      experiencia: arbitro.experiencia,
      activo: arbitro.activo
    };
    return addDoc(arbitrosCollection, arbitroData);
  }

  // MÉTODO PARA MODIFICAR UN ÁRBITRO EXISTENTE
  modificarArbitro(arbitro: Arbitro) {
    const documentRef = doc(this.db, 'arbitros', arbitro.id!);
    return updateDoc(documentRef, {
      nombre: arbitro.nombre,
      edad: arbitro.edad,
      especialidad: arbitro.especialidad,
      experiencia: arbitro.experiencia,
      activo: arbitro.activo
    });
  }

  // MÉTODO PARA BORRAR UN ÁRBITRO
  eliminarArbitro(arbitro: Arbitro) {
    const documentRef = doc(this.db, 'arbitros', arbitro.id!);
    return deleteDoc(documentRef);
  }
}
