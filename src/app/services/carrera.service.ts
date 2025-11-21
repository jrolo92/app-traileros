import { Injectable } from '@angular/core';
import { Carrera, Dificultad } from '../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private listaDeCarreras: Carrera [] = [
    {
      id: 1,
      titulo: 'Gran Vuelta Valle del Genal',
      dificultad: Dificultad.Alta,
      descripcion: 'Recorrido circular de 55 km por el Alto Valle del Genal con 2900 m de desnivel positivo. Una de las pruebas más exigentes del calendario nacional.',
      fecha: '2025-10-25',
      ubicacion: 'Pujerra, Málaga',
      distanciaKm: 55,
      desnivelPositivo: 2900,
      imagenUrl: 'assets/images/genal.jpg'
    },
    {
      id: 2,
      titulo: 'CXM La Toleta',
      dificultad: Dificultad.Media,
      descripcion: 'Carrera por montaña que recorre los parajes naturales de Puerto Serrano, con tramos técnicos y vistas espectaculares.',
      fecha: '2025-11-23',
      ubicacion: 'Puerto Serrano, Cádiz',
      distanciaKm: 29,
      desnivelPositivo: 1650,
      imagenUrl: 'assets/images/cxm-toleta.jpg'
    },
    {
      id: 3,
      titulo: 'Víboras Trail Algodonales',
      dificultad: Dificultad.Alta,
      descripcion: 'Carrera por montaña que atraviesa la Sierra de Líjar con salida en la Plaza de la Constitución. Ofrece modalidades de 42K, 21K y senderismo, con un recorrido exigente y vistas espectaculares.',
      fecha: '2025-02-01',
      ubicacion: 'Algodonales, Cádiz',
      distanciaKm: 42,
      desnivelPositivo: 4200,
      imagenUrl: ''
    },
    {
      id: 4,
      titulo: '101 Km de Ronda',
      dificultad: Dificultad.Alta,
      descripcion: 'Mítica prueba organizada por La Legión que recorre 101 km por la Serranía de Ronda. Una experiencia única con miles de participantes y ambiente festivo.',
      fecha: '2025-05-10',
      ubicacion: 'Ronda, Málaga',
      distanciaKm: 101,
      desnivelPositivo: 2500,
      imagenUrl: ''
    },
    {
      id: 5,
      titulo: 'Ultra Trail Sierra de los Bandoleros',
      dificultad: Dificultad.MuyAlta,
      descripcion: 'Recorrido épico por la Sierra de Grazalema, con tramos nocturnos, desniveles extremos y paisajes inolvidables. Modalidades de 82K y 166K.',
      fecha: '2025-03-07',
      ubicacion: 'Prado del Rey, Cádiz',
      distanciaKm: 82,
      desnivelPositivo: 4500,
      imagenUrl: ''
    }
  ];

  /**
   * Método público para obtener todas las carreras.
   * Devuelve una copia del array para proteger el original.
   */
  getCarreras(): Carrera[] {
    return [...this.listaDeCarreras]; // Usamos '...' (spread syntax) para devolver una copia
  };
  
}
