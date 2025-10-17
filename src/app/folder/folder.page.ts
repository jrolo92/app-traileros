import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from '../interfaces/carrera';
import { CarreraComponent } from '../components/carrera/carrera.component';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CarreraComponent, CommonModule],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public carreras: Carrera[] = [];
  private activatedRoute = inject(ActivatedRoute);
  constructor() { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'carreras') {
      this.carreras = [
        {
          id: 1,
          titulo: 'Gran Vuelta Valle del Genal Trail',
          dificultad: 'Alta',
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
          dificultad: 'Media',
          descripcion: 'Carrera por montaña que recorre los parajes naturales de Puerto Serrano, con tramos técnicos y vistas espectaculares.',
          fecha: '2025-11-23',
          ubicacion: 'Puerto Serrano, Cádiz',
          distanciaKm: 29,
          desnivelPositivo: 1650,
          imagenUrl: 'assets/images/cxm-toleta.jpg'
        }
      ]
    }
  }
}
