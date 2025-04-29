export interface Arbitro {
    id?: string;        // ID opcional para Firebase
    nombre: string;
    edad: number;
    especialidad: string;  // Ej: Central, Asistente, VAR
    experiencia: number;   // Años de experiencia
    activo: boolean;
}  