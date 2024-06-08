import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css',
})
export class ContactanosComponent {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      nombre: [''],
      telefono: [''],
      mensaje: [''],
      asunto: ['']
    })
  }

  submitForm() {
    window.location.href = `
      mailto:elianmeaca@gmail.com
      ?subject=${encodeURIComponent(this.contactForm.value.asunto)}
      &body=
      Nombre: ${encodeURIComponent(this.contactForm.value.nombre)}%0D%0A
      Telefono: ${encodeURIComponent(this.contactForm.value.telefono)}%0D%0A
      ${encodeURIComponent(this.contactForm.value.mensaje)} 
    `
  }
  
}
