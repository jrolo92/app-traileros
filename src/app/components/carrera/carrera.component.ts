import { Component, OnInit, Input } from '@angular/core';
import { Carrera } from 'src/app/interfaces/carrera';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.scss'],
  standalone:true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, ]
})
export class CarreraComponent  implements OnInit {

  @Input() carrera!: Carrera;
  constructor() { }

  ngOnInit() {}

}
