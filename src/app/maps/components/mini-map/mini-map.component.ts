import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');

  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);


  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat] 43.530843, -5.657480
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 50
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);

  }

}
