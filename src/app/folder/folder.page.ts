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
import { CarreraService } from '../services/carrera.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CarreraComponent, 
    CommonModule, FooterComponent, IonGrid, IonRow, IonCol, IonButton, FormsModule, IonSelect, IonSelectOption, FormularioModalComponent],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public listaDeCarreras: Carrera[] = [];
  public carreras: Carrera[] = [];
  private activatedRoute = inject(ActivatedRoute);

    // Inyectamos los tres controladores en el constructor 
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,  // (de momento solo vamos a usar el modal para el formulario)
    private carreraService: CarreraService
  ) {}

  // Función para abrir el modal
  async abrirModalFormulario() {

  const modal = await this.modalController.create({
    component: FormularioModalComponent, // El componente que se mostrará dentro
    });

  // 🔹 Aquí presentas el modal en pantalla
  await modal.present();

  // 🔹 Esperas a que se cierre y recibes datos
  const { data } = await modal.onDidDismiss<Carrera>();
  if (data) {
    this.carreras.unshift(data);

    // Mostramos mensaje de confirmación de tipo toast:
    const toast = await this.toastController.create({
      message: `Carrera "${data.titulo}" añadida correctamente`,
      duration: 1000,
      color: 'success'
    });
    await toast.present();
  }

  
}


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'inicio') {
      // Aquí ira el contenido del apartado Inicio

    }

    if (this.folder === 'carreras') {

      // this.cargarCarreras();
    }


  };

}
