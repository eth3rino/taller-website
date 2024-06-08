import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CarouselComponent,
    UbicacionComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {

}
