import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrls: ['./fullscreen-map-page.component.css']
})
export class FullscreenMapPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null);

  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40
  });

  zoomEffect = effect(() => {
    if(!this.map()) return;
    // this.map()?.zoomTo(this.zoom());
    this.map()?.setZoom(this.zoom());
  });

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;
    const {lat, lng} = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);

  }

  mapListeners(map: mapboxgl.Map){

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('loaded');
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);

  }

}
