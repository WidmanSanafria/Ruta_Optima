import { Component, OnInit } from '@angular/core';

declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // mi casa 0.3322116897546748, -78.22351741123508
  origin = { lat: 0.3322116897546748, lng: -78.22351741123508 };
  // Fundacion Sto. Domingo 0.3565299362292779, -78.11755744710119
  destination = { lat: 0.3565299362292779, lng: -78.11755744710119 };

  wayPoints: WayPoint[] = [
    {
      location: { lat: 0.35012242973662816, lng: -78.11444921641167 }, // Universidad Regional Autonoma de los Andes UNIANDES
      stopover: true,
    },
    {
      location: { lat: 0.35624214916339986, lng: -78.11733311516811 }, // Iglesia de Santo Domingo
      stopover: true,
    },
    {
      location: { lat: 0.35125713905161104, lng: -78.11885899047186}, // Museo El Cuartel Ibarra
      stopover: true,
    },
  ];


  constructor() {}
  ngOnInit() {
    this.loadMap();
  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }
  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.origin,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pueden mostrar las direcciones debido a: ' + status);
      }
    });
    }
}
