import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/angular/standalone';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonListHeader, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AjustesPage implements OnInit {
  // Por defecto estará apagado el modo oscuro
  modoOscuro: boolean = false; 

  constructor(private settingsService: SettingsService) { }

  // Añadimos async a este método para poder usar await dentro
  async ngOnInit() {
    // Al entrar, cargamos el valor guardado
    // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // así que usamos '|| false' para que sea false por defecto.
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    
    // Aplicamos el tema inmediatamente al entrar por si acaso
    this.aplicarTema(this.modoOscuro);
  }

  // También debe ser async porque settingsService.set devuelve una promesa
  async cambiarModoOscuro() {
    // 1. Guardamos el nuevo valor en la base de datos
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    
    // 2. Aplicamos el cambio visualmente
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' al body del documento
    // Esto activa los estilos que definiremos en variables.scss
    document.body.classList.toggle('dark', esOscuro);
  }
  

}
