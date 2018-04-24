declare interface Venue {

    id: string;
    name: string;
    contact: { phone: string; formattedPhone: string; };
    location: {
        address: string; crossStreet: string;
        lat: number; lng: number;
        labeledLatLngs: [{
            label: string;
            lat: number; lng: number
        }];
        distance: number;
        postalCode: string;
        cc: string;
        city: string;
        state: string;
        country: string;
        formattedAddress: string[];
    };
    categories: [{
        id: string; name: string; pluralName: string; shortName: string;
        icon: { prefix: string; suffix: string; }
        primary: Boolean;
    }];
    verified: Boolean;
    stats: {
        tipCount: number;
        usersCount: number;
        checkinsCount: number;
    }
    beenHere: { lastCheckinExpiredAt: number; }
    specials: {
        count: number;
        items: Array<any>;
    };
    venuePage: { id: string; }
    hereNow: {
        count: number;
        summary: string;
        groups: [{ type: string; name: string; count: number; items: Array<any> }]
    };
    referralId: string;
    venueChains: Array<any>;
    hasPerk: Boolean;
}

declare interface VenueResponse<T> {

    meta: { code: number; requestId: string; };
    notifications: Array<any>;
    response: { venues: Array<T> };
}