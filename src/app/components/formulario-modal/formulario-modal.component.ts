import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Carrera, Dificultad } from '../../interfaces/carrera';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton} from '@ionic/angular/standalone';
import {ModalController, AlertController, ToastController} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: true,
  imports: [ 
    FormsModule,
    CommonModule,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton, 
  ]
})

export class FormularioModalComponent  implements OnInit {
  @Output() carreraCreada = new EventEmitter<Carrera>();

  // 🔹 Declaramos el array de carreras
  public carreras: Carrera[] = [];

  // Inyectamos el constructor
  constructor(
      private modalController: ModalController,
      private alertController: AlertController,
      private toastController: ToastController
  ) {}

  // Creamos una nueva clase para el formulario con los atributos: int ID, y todos los string (les damos valores iniciales):
  public nuevaCarrera: Carrera = {
    id: 0,
    titulo: "",
    dificultad: Dificultad.Moderada,
    descripcion: "",
    fecha: "",
    ubicacion: "",
    // Forma de poner un tipo number como nulo sin que de error
    // Me interesa que en ambos no salga un 0 si no el placeholder
    distanciaKm: null as any,
    desnivelPositivo: null as any,
    imagenUrl: ""
  };


  // // Creamos una función que guarde los datos del formulario en objetos de la clase
  agregarCarrera(): Carrera | undefined {
    //Validamos que no se quedan los apartados vacios
    if (this.nuevaCarrera.titulo.trim().length === 0) return;
    if (this.nuevaCarrera.descripcion.trim().length === 0) return;
    if (this.nuevaCarrera.fecha.trim().length === 0) return;
    if (this.nuevaCarrera.ubicacion.trim().length === 0) return;
    if (!this.nuevaCarrera.distanciaKm || this.nuevaCarrera.distanciaKm <= 0) return;
    if (!this.nuevaCarrera.desnivelPositivo || this.nuevaCarrera.desnivelPositivo <= 0) return;
    if (this.nuevaCarrera.imagenUrl?.trim().length === 0) return;

    // Creamos una copia del objeto para añadirlo al array de carreras
    const carreraParaAñadir: Carrera = {
      ...this.nuevaCarrera,   // Copia todas las propiedades del objeto nueva carrera
      id: Date.now()          // Le asignamos un id único
    };

    // Reseteamos el objeto del formulario para la siguiente carrera
    this.nuevaCarrera = {    
      id: 0,
      titulo: "",
      dificultad: Dificultad.Moderada,
      descripcion: "",
      fecha: "",
      ubicacion: "",
      // Para que no salga un 0 como placeholder
      distanciaKm: null as any, 
      desnivelPositivo: null as any,
      imagenUrl: ""
    };

    return carreraParaAñadir;

  }

  // Método para cerrar y enviar datos
  async guardar() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres guardar esta carrera?',
      cssClass: 'alert-grey',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: () => {
            const carrera = this.agregarCarrera();

            if (carrera) {
              this.modalController.dismiss(carrera);
              return true;
            } else {
              // Falló validación
              this.mostrarToastError();
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para cerrar sin enviar nada
  cancelar() {
    this.modalController.dismiss();
  }

  // Método para mostrar Toast con mensaje de error
private async mostrarToastError() {
  const toast = await this.toastController.create({
    message: 'Por favor, rellena todos los campos correctamente.',
    duration: 2000,
    color: 'warning'
  });
  await toast.present();
}

  ngOnInit() {  }



}
