import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera, Dificultad } from '../interfaces/carrera';
import { CarreraComponent } from '../components/carrera/carrera.component';
import { FooterComponent } from '../components/footer/footer.component';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone'; // componentes de la rejilla y del select del formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, AlertController, ModalController } from '@ionic/angular/standalone';
import { FormularioModalComponent } from '../components/formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CarreraComponent, 
    CommonModule, FooterComponent, IonGrid, IonRow, IonCol, IonButton, FormsModule, IonSelect, IonSelectOption],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public carreras: Carrera[] = [];
  private activatedRoute = inject(ActivatedRoute);

    // Inyectamos los tres controladores en el constructor 
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController  // (de momento solo vamos a usar el modal para el formulario)
  ) {}

  // Función para abrir el modal
  async abrirModalFormulario() {
    const modal = await this.modalController.create({
      component: FormularioModalComponent, // El componente que se mostrará dentro
      // Podemos pasar datos al modal usando componentProps
      componentProps: {
        titulo: 'Detalles Adicionales',
        descripcion: 'Esta información viene desde la página principal.'
      }
    });
    await modal.present();

    // Podemos esperar a que el modal se cierre y recibir datos de vuelta
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Datos recibidos del modal:', data);
    }
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'inicio') {
      // Aquí ira el contenido del apartado Inicio

    }

    if (this.folder === 'carreras') {
      this.carreras = [
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

      ]
    }
  }
}
