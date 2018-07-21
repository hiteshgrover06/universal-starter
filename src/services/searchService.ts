
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../services/httpInterceptor';
import { Observable } from 'rxjs/Observable';
import { SearchEngine } from '../declarations/enums';

const SearchEngineEndPoints: string[] = [
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyDXkgpdHRfcx82Ojp8hCx_pbVHc61T21cY&cx=017576662512468239146:omuauf_lfve&q={0}',
    'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0?q={0}&customconfig=services',
    '2',
    '3'
];

@Injectable()
export class SearchEngineService {

    constructor(private httpInterceptor: HttpInterceptor) { }

    public QueryResults = (queryText: string, searchEngineType: SearchEngine): Observable<any> => {
        const url = SearchEngineEndPoints[searchEngineType].replace('{0}', queryText);

        const headers = {
            'Ocp-Apim-Subscription-Key': 'd9cb2084769c43ae9f4e601227054358'
        };

        return this.httpInterceptor.get(url, searchEngineType === 1 ? headers : null);
    }
}
