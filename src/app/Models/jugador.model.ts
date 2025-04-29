export interface Jugador {
    id?: string;         // ID opcional para Firebase
    nombre: string;
    edad: number;
    posicion: string;
    nacionalidad: string;
    numero: number;
    equipo: string;      // Nombre del equipo (relación simple)
}  