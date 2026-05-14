import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink, IonImg, IonThumbnail, IonAvatar, IonFooter, IonButton, IonCardContent } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  homeOutline, homeSharp,
  walkOutline, walkSharp,
  mailOutline, mailSharp,
  pencilOutline, pencilSharp,
  flagOutline, flagSharp,
  mapOutline, mapSharp,
  peopleOutline, peopleSharp,
  cubeOutline, cubeSharp,
  bookmarkOutline, bookmarkSharp,
  chevronForwardOutline,
  settingsOutline, settingsSharp,
  cameraOutline, cameraSharp, camera
} from 'ionicons/icons';


import { PhotoService } from './services/photo.service';
import { SettingsService } from './services/settings.service';
import { HapticsService } from './services/haptics.service';
import { ShareService } from './services/share.service';

import { Platform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonCardContent, IonButton, IonFooter, IonAvatar, IonImg, 
    RouterLink, RouterLinkActive,
    IonApp, IonSplitPane, IonMenu, IonContent,
    IonList, IonListHeader, IonMenuToggle,
    IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonThumbnail
  ],
})
export class AppComponent {

  nombreEnMenu: string = 'Usuario Trail';
  imagen: string = '';

  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home' },
    { title: 'Carreras', url: '/folder/carreras', icon: 'walk' },
    { title: 'Inscripciones', url: '/folder/inscripciones', icon: 'pencil' },
    { title: 'Resultados', url: '/folder/resultados', icon: 'flag' },
    { title: 'About', url: '/folder/about', icon: 'information-circle' },
    { title: 'Ajustes', url: '/folder/ajustes', icon: 'settings'}
  ];

  public labels = [
    'Favoritas'
  ];

  constructor(
    private settings: SettingsService,
    public photoService: PhotoService,
    private haptics: HapticsService,
    private shareService: ShareService,
    private platform: Platform,
    ) {
    addIcons({
      homeOutline, homeSharp,
      walkOutline, walkSharp,
      mailOutline, mailSharp,
      pencilOutline, pencilSharp,
      flagOutline, flagSharp,
      mapOutline, mapSharp,
      peopleOutline, peopleSharp,
      cubeOutline, cubeSharp,
      bookmarkOutline, bookmarkSharp,
      chevronForwardOutline,
      settingsOutline,
      settingsSharp,
      cameraOutline, cameraSharp, camera
      
    });
    this.settings.modoOscuro$.subscribe(isDark => { document.body.classList.toggle('dark', isDark); });
    // Escuchamos siempre el nombre
    this.settings.nombreUsuario$.subscribe(nuevoNombre => {
      this.nombreEnMenu = nuevoNombre;
    });
    // Y escuchamos también los cambios de la foto d perfil
    this.settings.imagenPerfil$.subscribe(res => {
      this.imagen = res;
    });
    // Llamamos a la función para quitar el Splash
    this.ocultarSplash();
  }

  // Creamos un "getter" para obtener el nombre guardado en LocalStorage
  get nombreUsuario() {
    return localStorage.getItem('nombreUsuario') || 'Usuario Trail';
  }

  // Metodo para que haya vibración al desplegar el menú lateral (usamos el suave)
  async vibrarApertura() {
    await this.haptics.impactoSuave();
  }

  // Método para el botón de compartir
  compartir() {
    this.shareService.compartirApp();
  }

  // Método para quitar el splash cuando la app esté cargada
  async ocultarSplash() {
    // Esperamos a que el dispositivo esté listo
    await this.platform.ready();
    
    // Le ponemos un pequeño delay porque carga demasiado rápido y no se ve
    await new Promise(resolve => setTimeout(resolve, 500));

    // Ocultamos la imagen
    await SplashScreen.hide();
  }

}