import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonIcon, IonCardTitle, IonCardContent, IonButton, IonCardSubtitle, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
// Necesario para redirección a carreras desde el botón
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonCardContent, IonCardTitle, IonIcon, IonCardHeader, IonCard, IonCol, IonRow,
            IonContent, CommonModule, FormsModule, RouterModule, FooterComponent]
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
