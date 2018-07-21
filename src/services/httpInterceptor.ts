
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpInterceptor {

    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('username:password'));
    }

    get(url, customHeaders: any) {
        const headers = new Headers();

        if (customHeaders) {
            for (let key in customHeaders) {
                if (customHeaders.hasOwnProperty(key)) {
                    headers.append(key, customHeaders[key]);
                }
            }
        }
        return this.http.get(url, customHeaders ? {
            headers: headers
        } : null);
    }

    post(url, data) {
        return this.http.post(url, data);
    }
}
