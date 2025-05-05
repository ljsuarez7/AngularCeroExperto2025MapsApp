import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null);

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-5.657480, 43.530843], // starting position [lng, lat] 43.530843, -5.657480
      zoom: 14, // starting zoom
    });

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: '#000'
    }).setLngLat([-5.657480, 43.530843]).addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    });

    this.mapListeners(map);

  }

  mapListeners(map: mapboxgl.Map){

    console.log('mapListeners');


    // map.on('zoomend', (event) => {
    //   const newZoom = event.target.getZoom();
    //   this.zoom.set(newZoom);
    // });

    // map.on('moveend', () => {
    //   const center = map.getCenter();
    //   this.coordinates.set(center);
    // });

    // map.on('load', () => {
    //   console.log('loaded');
    // });

    // map.addControl(new mapboxgl.FullscreenControl());
    // map.addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.ScaleControl());

    // this.map.set(map);

  }

}
