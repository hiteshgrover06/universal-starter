import { Component } from '@angular/core';
import * as Services from '../services/index';

@Component({
  selector: 'app-root',
  templateUrl: 'appTemplate.html',
  styles: ['styles.css']
})


export class AppComponent {

  public VenuesData: Array<Venue>;

  constructor(private fourSquareService: Services.FourSquareService,
    private mapService: Services.MapsService) {

  }


  ngOnInit() {
    this.mapService.InitMap();
    this.mapService.GetLocation().then(this.searchVenues);
  }

  private onVenuesOk = (response) => {
    console.log('response', response);
    const data: VenueResponse<Venue> = response && response.json();
    if (data && data.meta && data.meta.code === 200) {
      this.VenuesData = data.response.venues;
      this.VenuesData.forEach((venue: Venue) => {

      });
      this.mapService.PlotMarkers(this.VenuesData);
    } else {

    }
  }

  private onVenuesNOk = (response) => {

  };
  private searchVenues = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    this.fourSquareService.GetVenuesForLatLng(lat, lng).subscribe(response => {
      this.onVenuesOk(response);
    }, error => {
      console.log('error', error);
    });
  }


  public SearchVenues = (searchParam: string) => {
    searchParam &&
      this.fourSquareService.GetVenuesForNearLocation(searchParam.trim()).subscribe(response => {
        this.onVenuesOk(response);
      }, error => {
        console.log('error', error);
      });
  }

  public GetFormattedAddressForVenue(venue: Venue) {
    return venue.location && venue.location.formattedAddress && venue.location.formattedAddress.length &&
      venue.location.formattedAddress.join(', ');
  }

  public GetVenueCategoryIcon(venue: Venue): string {
    const primaryCat = venue.categories && venue.categories.length && venue.categories.filter(item => item.primary);
    return primaryCat && primaryCat.length && primaryCat[0].icon.prefix.concat(primaryCat[0].icon.suffix, '&oauth_token=JVIRXGITAAMFDCNOC2ELHQKTHWWQSNU02LCYPBV1B01AUGLT&v=20180422');
  }
}
