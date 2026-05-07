import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { HapticsService } from './haptics.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private haptics: HapticsService) { }

  async compartirApp() {
    // Feedback táctil para que el usuario sienta el click
    await this.haptics.impactoSuave();

    await Share.share({
      title: '¡Bienvenido a Traileros!',
      text: 'La plataforma definitiva para amantes del Trail Running',
      url: 'https://github.com/jrolo92/', 
      dialogTitle: 'Compartir con amigos',
    });
  }
}
