import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  router = inject(Router);

  routes = routes.map( route => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}` // los `` son para que lo muestre como string en el tipado
  })).filter(route => route.path !== '**');

  //Versión observable
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap(event => console.log(event)),
    map(event => event.url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas')
  );

  //Versión señal
  // pageTitle = toSignal(
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd),
  //     // tap(event => console.log(event)),
  //     map(event => event.url),
  //     map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas')
  //   )
  // );

}
