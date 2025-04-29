export interface Equipo {
    id?: string;        // ID opcional para Firebase
    nombre: string;
    ciudad: string;
    fundacion: number;
    estadio: string;
    entrenador: string;
    logoURL?: string;    // Opcional si aún no hay logo subido
}  