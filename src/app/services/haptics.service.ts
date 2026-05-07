import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})

export class HapticsService {

  constructor() { }

  // Vibración suave
  async impactoSuave() {
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  // Vibración de éxito
  async exito() {
    await Haptics.notification({ type: NotificationType.Success });
  }

  // Vibración de error
  async error() {
    await Haptics.notification({ type: NotificationType.Error });
  }
  
}
