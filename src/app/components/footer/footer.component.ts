import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true, //Componente independiente
  imports: []
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
