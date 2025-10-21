export interface Carrera {
        id: number;
        titulo: string;
        dificultad: Dificultad;
        descripcion: string;
        fecha: string;
        ubicacion: string;
        distanciaKm : number;
        desnivelPositivo: number;
        imagenUrl?: string;
}

export enum Dificultad {
  Alta = "Alta",
  Media = "Intermedia",
  Moderada = "Moderada"
}
