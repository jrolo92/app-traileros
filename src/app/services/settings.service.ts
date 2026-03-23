import { Injectable } from '@angular/core';
// Importamos Storage
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Variable privada para guardar la instancia de la base de datos
  private _storage: Storage | null = null;

  // Estado reactivo del modo oscuro 
  modoOscuro$ = new BehaviorSubject<boolean>(false);

  // Creamos el canal para el nombre, inicializando con lo que haya en LocalStorage
  private nombreSubject = new BehaviorSubject<string>(localStorage.getItem('nombreUsuario') || 'Usuario Trail');
  nombreUsuario$ = this.nombreSubject.asObservable();

  // Creamos el canal para la foto de perfil
  private imagenSubject = new BehaviorSubject<string>(localStorage.getItem('imagenPerfil') || 'assets/default-avatar.png');
  imagenPerfil$ = this.imagenSubject.asObservable();

  actualizarNombre(nuevoNombre: string) {
    localStorage.setItem('nombreUsuario', nuevoNombre);
    this.nombreSubject.next(nuevoNombre); // Emitimos el nuevo valor
  }

  

  // 2. Inyectamos el servicio Storage en el constructor
  constructor(private storage: Storage) {
    this.init(); // Iniciamos la base de datos al arrancar el servicio
  }

   /**
   * Inicializa la base de datos de Ionic Storage.
   * Es vital llamar a esto antes de intentar leer o escribir.
   */
  async init(): Promise<void> { // Añadimos el tipo de retorno explícito
    // Si ya está iniciada, no hacemos nada
    if (this._storage != null) {
      return;
    }

    // Creamos la instancia
    const storage = await this.storage.create();
    this._storage = storage;

    const saved = await this._storage.get('modo_oscuro'); 
    this.modoOscuro$.next(saved || false);
  }

  async setModoOscuro(value: boolean) { 
    await this._storage?.set('modo_oscuro', value); 
    this.modoOscuro$.next(value); 
  }

  async getModoOscuro(): Promise<boolean> { 
    return await this._storage?.get('modo_oscuro') || false; 
  }

  /**
   * Guarda un valor en la base de datos asociado a una clave.
   * @param key La clave única (ej: 'modo_oscuro')
   * @param value El valor a guardar (ej: true, 'Javier', etc.)
   */
  public async set(key: string, value: any): Promise<void> {
    // Nos aseguramos de que esté iniciada
    await this.init(); 
    await this._storage?.set(key, value);

    if (key === 'nombre_usuario') {
      this.nombreSubject.next(value);
    }
  }

  /**
   * Recupera un valor de la base de datos.
   * @param key La clave a buscar
   * @returns El valor guardado o null si no existe
   */
  public async get(key: string): Promise<any> {
    await this.init();
    return await this._storage?.get(key);
  }
  
  /**
   * Elimina un valor de la base de datos.
   */
  public async remove(key: string): Promise<void> {
    await this.init();
    await this._storage?.remove(key);
  }

  // Método para cargar el nombre al arrancar la app
  async cargarNombre() {
    const nombre = localStorage.getItem('nombre_usuario') || 'Usuario Trail';
    this.nombreSubject.next(nombre);
  }

  // Método para actualizar la foto de perfil
  actualizarImagen(nuevaImagen: string) {
    localStorage.setItem('imagenPerfil', nuevaImagen);
    this.imagenSubject.next(nuevaImagen); 
  }

}
