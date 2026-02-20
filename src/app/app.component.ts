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
} from 'ionicons/icons';
import { SettingsService } from './services/settings.service';

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

  constructor(private settings: SettingsService) {
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
      
    });
    this.settings.modoOscuro$.subscribe(isDark => { document.body.classList.toggle('dark', isDark); });
  }

  
}