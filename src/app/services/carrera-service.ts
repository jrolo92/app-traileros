import { Injectable } from '@angular/core';
import { Carrera, Dificultad } from '../interfaces/carrera';
// Http client (JSON server)
import { HttpClient } from '@angular/common/http';
// Utilidad para promesas
import {first, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  // Definir la URL base de nuestra API (Por defecto JSON server: puerto 3000)
  private _url = 'http://localhost:3000/carreras';

  // Inyectamos el servicio HTTP (JSON Server) en el constructor
  constructor(private http: HttpClient){}

  /**
   * Método público y asíncrono para obtener todas las carreras.
   */
  async getCarreras(): Promise<Carrera[]> {
    // Hacemos la petición GET a la URL.
    // Usamos el genérico <Carrera[]> para decirle a TypeScript que esperamos un array de carreras.
    // firstValueFrom convierte el Observable en una Promesa.
    return firstValueFrom(this.http.get<Carrera[]>(this._url));
  };

  /**
   * Método público y asínccrono para obtener una carrera por su ID (GET /carreras/ID).
   */
  async getCarreraPorId(id: string | number): Promise<Carrera> {
    // Preparamos la URL específica
    const urlEspecifica = `${this._url}/${id}`;
    return firstValueFrom(this.http.get<Carrera>(urlEspecifica));
  }

  /**
   * Método para añadir nuevas carreras al servidor (POST /carreras)
   */
  async agregarCarrera(carrera: any): Promise<Carrera> {
    // 1. Eliminamos el ID antes de enviar
    // Creamos una copia del objeto sin el campo id
    const {id, ...carreraSinId} = carrera;

    // 2. Hacemos petición post para envíar el objeto sin id
    // Parámetros: URL de la coleccion y el objeto que se va a crear
    return firstValueFrom(
      this.http.post<Carrera>(this._url, carreraSinId)
    );
  }
}
