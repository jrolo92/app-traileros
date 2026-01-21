import { AfterViewInit, Component, inject, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from '../interfaces/carrera';
import { CarreraComponent } from '../components/carrera/carrera.component';
import { FooterComponent } from '../components/footer/footer.component';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonSkeletonText, IonIcon, IonCardSubtitle, IonListHeader } from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone'; // componentes de la rejilla y del select del formulario
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ToastController, AlertController, ModalController } from '@ionic/angular/standalone';
import { FormularioModalComponent } from '../components/formulario-modal/formulario-modal.component';
import { CarreraService } from '../services/carrera-service';
import { AnimationController, Animation } from '@ionic/angular/standalone';
// import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonListHeader, IonCardSubtitle, IonIcon, IonSkeletonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CarreraComponent,
    CommonModule, FooterComponent, IonGrid, IonRow, IonCol, IonButton, FormsModule],
})
export class FolderPage implements OnInit, AfterViewInit {
  public folder!: string;
  // Guardará la lista de carreras que nos devuelva el servicio
  public listaDeCarreras: Carrera[] = [];
  // Propiedad para controlar si está cargando la pagina o no (para mostrar skeletons):
  public cargando: boolean = true;
  // Por defecto ponemos el modo oscuro en falso
  // modoOscuro: boolean = false;

  // Obtenemos la referencia al elemento del HTML que queremos animar
  // Usamos ViewChildren para que pille todas las tarjetas en una Lista
  @ViewChildren('tarjetaExterna', { read: ElementRef }) tarjetaExterna!: QueryList<ElementRef>;
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
    private animationCtrl: AnimationController,
    // Servicio de Ajustes
    // private settingsService: SettingsService
  ) {
    // Simulamos un tiempo de carga de datos de 1 segundos
    setTimeout(() => {
      this.cargarCarreras();
      this.cargando = false;
    },
      1000
    );
  }

  // Método que ejecuta cuando la vista ya está lista (para animaciones)
  ngAfterViewInit() {
    // Usamos el setTimeOut para asegurar que no empieza la animación hasta que este todo cargado
    setTimeout(() => {
      this.tarjetaExterna.forEach(tarjeta => {
        // Creamos la animación
        const animacion = this.animationCtrl
          .create()
          .addElement(tarjeta.nativeElement)
          .duration(800)
          .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
          .fromTo('opacity', '0', '1');
        animacion.play();
      });
    }, 1000);
  }

  async ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // // Al entrar, cargamos el valor guardado
    // // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // // así que usamos '|| false' para que sea false por defecto.
    // this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    // // Aplicamos el tema inmediatamente al entrar por si acaso
    // this.aplicarTema(this.modoOscuro);

    // console.log(this.modoOscuro);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'inicio') {
      // Aquí ira el contenido del apartado Inicio

    }

    if (this.folder === 'carreras') {
      // Llamamos al método que carga las carreras
      this.cargarCarreras();

    }

    if (this.folder === 'ajustes') {
      
    }

  };

  // Aquí van a ir los métodos (fuera del ngOnInit)
  // Método para cargar el array de carreras
  cargarCarreras() {
    this.listaDeCarreras = this.carreraService.getCarreras();
  }

  // Función para abrir el modal del formulario
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

  // async cambiarModoOscuro() {
  //   await this.settingsService.set('modo_oscuro', this.modoOscuro);
  //   document.body.classList.toggle('dark', this.modoOscuro);
  // }

  // aplicarTema(esOscuro: boolean) {
  //   // Añadimos o quitamos la clase 'dark' al body del documento
  //   // Esto activa los estilos que definiremos en variables.scss
  //   document.body.classList.toggle('dark', esOscuro);
  // }

}
