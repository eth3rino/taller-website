import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trabajos.component.html',
  styleUrl: './trabajos.component.css',
})
export class TrabajosComponent implements AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute) {
    
  }

  @ViewChild('trabajosWrapper') trabajosWrapper!: ElementRef;
  @ViewChild('imageOverlay') imageOverlay!: ElementRef;

  scrollSubscription!: Subscription;

  trabajos = [
    {
      imagenUrl: 'https://images.unsplash.com/photo-1573320021203-04c08915f24f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      nombre: 'Hogar Ruco',
      etiquetas: [
        {
          etiquetaImagen: 'Impresion',
          etiquetaNombre: 'Impresion'
        },
        {
          etiquetaImagen: 'Ploteo',
          etiquetaNombre: 'Ploteo'
        }
      ],
      isOpen: false
    },
    {
      imagenUrl: 'https://images.unsplash.com/photo-1485409350190-f923525f26eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      nombre: 'Servitec Elian',
      etiquetas: [
        {
          etiquetaImagen: 'Impresion',
          etiquetaNombre: 'Impresion'
        }
      ],
      isOpen: false
    },
    {
      imagenUrl: 'https://images.unsplash.com/photo-1656530228783-dcb0a67c1d69?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      nombre: 'Local',
      etiquetas: [
        {
          etiquetaImagen: 'Etiqueta',
          etiquetaNombre: 'Etiqueta'
        },
        {
          etiquetaImagen: 'Etiqueta',
          etiquetaNombre: 'Etiqueta'
        },
        {
          etiquetaImagen: 'Etiqueta',
          etiquetaNombre: 'Etiqueta'
        }
      ],
      isOpen: false
    }
  ]

  ngAfterViewInit(): void {
    if (this.activatedRoute.snapshot.params != Number) 
      {
        this.activateSlide(this.trabajos[this.activatedRoute.snapshot.params['id']])
        setTimeout(() => {
          window.scrollBy({
            top: 350 * this.activatedRoute.snapshot.params['id'],
            left: 0,
            behavior: 'smooth',
          });
        }, 450);
      }
    
  }

  openedImage: string | null = null;

  // activateSlide(slide: any) {
  //   // the code for that would be here
  //   slide.isOpen = !slide.isOpen
  //   console.log(slide.isOpen)
  // }
  activateSlide(slide: any) {
    this.trabajos.forEach((trabajo) => {
      if (trabajo !== slide) {
        trabajo.isOpen = false; // Close all slides except the clicked one
      }
    });
    slide.isOpen = !slide.isOpen; // Toggle the clicked slide
  }

  showImage(event: MouseEvent, imagen: any) {
    event.stopPropagation();
    this.openedImage = imagen.etiquetaImagen;
    if (this.openedImage) console.log('show OK')
  }

  closeOverlay() {
    this.openedImage = null;
    if (this.openedImage) console.log('close OK')
  }
}
