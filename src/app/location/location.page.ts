import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  geolocation: Geolocation;
  platform: Platform;
  constructor(platform: Platform, geolocation: Geolocation) {
    this.platform = platform;
    this.geolocation = geolocation;
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.presentMap();
    this.loadUserLocation();
  }

  presentMap() {
    const initialPosition = new google.maps.LatLng(-30.5595, 22.9375);
    const mapOptions: google.maps.MapOptions = {
      center: initialPosition,
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const bloemfonteinAddress = new google.maps.LatLng(-29.121600, 26.196200);
    const bloemfonteinMarker = new google.maps.Marker({
      map: this.map,
      position: bloemfonteinAddress
    });
    const kimberleyAddress = new google.maps.LatLng(-28.772763, 24.680181);
    const kimberleyMarker = new google.maps.Marker({
      map: this.map,
      position: kimberleyAddress
    });
  }

  loadUserLocation() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        const dropOffAddress = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const droppOffIcon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
        };
        const dropOffMarker = new google.maps.Marker({
          map: this.map,
          position: dropOffAddress,
          icon: droppOffIcon
        });
        dropOffMarker.addListener('click', () => {
          this.infoWindow.setContent('How far you are from the nearest branch.');
          this.infoWindow.open();
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

}
