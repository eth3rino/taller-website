import { Component, Optional } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { animate, group, query, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* => trabajosAnimation', [
        group([
          query(':enter, :leave', [
            style({position: 'absolute', width: '100%', height: '100%'})
          ], {optional: true}),
          query(':enter', [
            style({opacity: 0, position: 'absolute', width: '100%', zIndex: '2'}),
            animate('0s', style({opacity: 1}))
          ], {optional: true}),
          query(':leave', [
            style({opacity: 1, position: 'absolute', width: '100%', zIndex: '1'}),
            animate('.4s', style({opacity: 0}))
          ], {optional: true})
        ]),
      ]),
      transition('* <=> *', [
        group([
          query(':leave', [
            style({opacity: 1, position: 'absolute', width: '100%'}),
            animate('.3s', style({opacity: 0}))
          ], {optional: true}),
          query(':enter', [
            style({opacity: 0, position: 'absolute', width: '100%'}),
            animate('.3s .4s', style({opacity: 1}))
          ], {optional: true})
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'taller';

  prepareRouteTransition(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
