import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Carrera, Dificultad } from '../../interfaces/carrera';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';
import { CarreraComponent } from '../carrera/carrera.component';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton, CarreraComponent
  ]
})

export class FormularioModalComponent  implements OnInit {
   @Output() carreraCreada = new EventEmitter<Carrera>();

  // Creamos una nueva clase para el formulario con los atributos: int ID, y todos los string (les damos valores iniciales):
  public nuevaCarrera: Carrera = {
    id: 0,
    titulo: "",
    dificultad: Dificultad.Moderada,
    descripcion: "",
    fecha: "",
    ubicacion: "",
    distanciaKm: 0.00,
    desnivelPositivo: 0.00,
    imagenUrl: ""
  };


  // // Creamos una función que guarde los datos del formulario en objetos de la clase
  agregarCarrera(){
    //Verificar que no se quedan los apartados vacios
    if (this.nuevaCarrera.titulo.trim().length === 0){
      //Alert: no puede estar vacio
      return;
    }      
    if (this.nuevaCarrera.descripcion.trim().length === 0){
      return;
    }
    if (this.nuevaCarrera.fecha.trim().length === 0){
      return;
    }
    if (this.nuevaCarrera.ubicacion.trim().length === 0){
      return;
    }
    if (this.nuevaCarrera.distanciaKm !== 0){
      return;
    }
    if (this.nuevaCarrera.distanciaKm !== 0){
      return;
    }
    if (this.nuevaCarrera.desnivelPositivo !== 0){
      return;
    }
    if (this.nuevaCarrera.imagenUrl?.trim().length === 0){
      return;
    }
    // Creamos una copia del objeto para añadirlo al array de carreras
    const carreraParaAñadir: Carrera = {
      ...this.nuevaCarrera,   // Copia todas las propiedades del objeto nueva carrera
      id: Date.now()          // Le asignamos un id único
    };

    // Añadimos la nueva carrera al principio del array de carreras
    this.carreras.unshift(carreraParaAñadir);

    // Reseteamos el objeto del formulario para la siguiente carrera
    this.nuevaCarrera = {    
      id: 0,
      titulo: "",
      dificultad: Dificultad.Moderada,
      descripcion: "",
      fecha: "",
      ubicacion: "",
      distanciaKm: 0,
      desnivelPositivo: 0,
      imagenUrl: ""
    };
    this.carreraCreada.emit(carreraParaAñadir);
  }

  constructor() { }

  ngOnInit() {  }



}
