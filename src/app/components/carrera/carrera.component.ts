import { Component, OnInit, Input } from '@angular/core';
import { Carrera } from 'src/app/interfaces/carrera';
import { FooterComponent } from '../footer/footer.component';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.scss'],
  standalone:true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, CommonModule, CarreraComponent, FooterComponent]
})
export class CarreraComponent  implements OnInit {

  @Input() carrera!: Carrera | undefined; 
  constructor() { }

  ngOnInit() {}

}
