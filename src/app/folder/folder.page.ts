import { AfterViewInit, Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera, Dificultad } from '../interfaces/carrera';
import { CarreraComponent } from '../components/carrera/carrera.component';
import { FooterComponent } from '../components/footer/footer.component';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonImg, IonSkeletonText } from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone'; // componentes de la rejilla y del select del formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, AlertController, ModalController } from '@ionic/angular/standalone';
import { FormularioModalComponent } from '../components/formulario-modal/formulario-modal.component';
import { CarreraService } from '../services/carrera-service';
import { AnimationController, Animation } from '@ionic/angular/standalone';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonImg, IonInput, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CarreraComponent, 
    CommonModule, FooterComponent, IonGrid, IonRow, IonCol, IonButton, FormsModule, IonSelect, IonSelectOption, FormularioModalComponent],
})
export class FolderPage implements OnInit, AfterViewInit {
  public folder!: string;
  // Guardará la lista de carreras que nos devuelva el servicio
  public listaDeCarreras: Carrera[] = [];
  // Propiedad para controlar si está cargando la pagina o no (para mostrar skeletons):
  public cargando: boolean = true;

  // Obtenemos la referencia al elemento del HTML que queremos animar
  @ViewChild('tarjetaExterna', {read: ElementRef}) tarjetaExterna!: ElementRef;
  private animacion!: Animation;

  private activatedRoute = inject(ActivatedRoute);

  // Inyectamos los controladores necesarios en el constructor 
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,  // (de momento solo vamos a usar el modal para el formulario)
    // Controlador de servicio Carrera
    private carreraService: CarreraService,
    // Controlador de Animaciones
    private animationCtrl: AnimationController
  ) {
    // Simulamos un tiempo de carga de datos de 1 segundos
    setTimeout(()=>{
      this.listaDeCarreras;
      this.cargando = false;      
      },
      1000
    );
  }

  // Método que ejecuta cuando la vista ya está lista (para animaciones)
  ngAfterViewInit() {
    // Creamos la animación
    this.animacion = this.animationCtrl
      .create()
      // Referencia al elemento a animar
      .addElement(this.tarjetaExterna.nativeElement)
      .duration (800)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');

    // Ejecutamos la animación
    this.animacion.play();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'inicio') {
      // Aquí ira el contenido del apartado Inicio

    }

    if (this.folder === 'carreras') {
      // Llamamos al método que carga las carreras
      this.cargarCarreras();

    }

  };

  // Aquí van a ir los métodos (fuera del ngOnInit)
  // Método para cargar el array de carreras
  cargarCarreras(){
    this.listaDeCarreras = this.carreraService.getCarreras();
  }

  // Función para abrir el modal
  async abrirModalFormulario() {

    const modal = await this.modalController.create({
      component: FormularioModalComponent, // El componente que se mostrará dentro
    });

    // Aquí presentas el modal en pantalla
    await modal.present();

    // Esperas a que se cierre y recibes datos
    const { data } = await modal.onDidDismiss<Carrera>();
    if (data) {
      this.listaDeCarreras.unshift(data);

      // Mostramos mensaje de confirmación de tipo toast:
      const toast = await this.toastController.create({
        message: `Carrera "${data.titulo}" añadida correctamente`,
        duration: 1000,
        color: 'success'
      });
      await toast.present();
    }
  }

}
