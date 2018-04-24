
const SEARCH_VENUES = `https://api.foursquare.com/v2/venues/search`;
const OAUTH_TOKEN = `JVIRXGITAAMFDCNOC2ELHQKTHWWQSNU02LCYPBV1B01AUGLT&v=20180422`;

import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../services/httpInterceptor';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FourSquareService {

    constructor(private httpInterceptor: HttpInterceptor) { }

    public GetVenuesForLatLng = (lat: Number, lng: Number, radius: number = 0.02): Observable<any> => {
        const url = SEARCH_VENUES.concat(`?ll=${lat},${lng}&oauth_token=${OAUTH_TOKEN}&radius=${radius}`);
        return this.httpInterceptor.get(url);
    }

    public GetVenuesForNearLocation = (near: string, radius: number = 0.02): Observable<any> => {
        const url = SEARCH_VENUES.concat(`?near=${near}&oauth_token=${OAUTH_TOKEN}&radius=${radius}`);
        return this.httpInterceptor.get(url);
    }
}
