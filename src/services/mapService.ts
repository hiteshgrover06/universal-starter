
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapsService {
    constructor() { }

    private _mapInstance: google.maps.Map;

    private isGeolocationSupported = (): Boolean => {
        return !!navigator.geolocation;
    }

    private initializeMap = (lat: number, lng: number) => {
        if (!this._mapInstance) {
            const myOptions = {
                zoom: 10,
                center: { lat: lat, lng: lng },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this._mapInstance = new google.maps.Map(document.getElementById('map'), <any>myOptions);
        }
    }

    public InitMap = () => {
        this.initializeMap(-34.397, 150.644);
    }

    public GetLocation = () => {
        return new Promise((resolve, reject) => {
            if (this.isGeolocationSupported()) {
                navigator.geolocation.getCurrentPosition((e) => {
                    this.ShowMap(e);
                    resolve(e);
                }, this.HandleError);
            } else {
                // no native support;
                console.log('Your browser doesn\'t support geolocation!');

            }
        });
    }

    public ShowMap = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const latlng = new google.maps.LatLng(latitude, longitude);
        if (!this._mapInstance) {
            this.initializeMap(latitude, longitude);
        } else {
            this._mapInstance.setZoom(20);
            this._mapInstance.setCenter(latlng);
        }

        const marker = new google.maps.Marker({
            position: latlng,
            title: 'You are here (more or less)!'
        });

        // To add the marker to the map, call setMap();
        marker.setMap(this._mapInstance);

        console.log('Your browser thinks you are here:');
        console.log('Latitude: ' + latitude);
        console.log('Longitude: ' + longitude);
    }

    public HandleError = (err) => {
        if (err.code === 1) {
            // user said no!
            console.log('You chose not to share your location.');
        }
    }

    public PlotMarkers = (venues: Venue[]) => {
        venues.forEach((item: Venue) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.location.lat, item.location.lng),
                title: item.name
            });

            // To add the marker to the map, call setMap();
            marker.setMap(this._mapInstance);
            this._mapInstance.setCenter(marker.getPosition());

        });

    }

}
