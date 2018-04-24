
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpInterceptor {

    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('username:password'));
    }

    get(url) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
        });
    }

    post(url, data) {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}
