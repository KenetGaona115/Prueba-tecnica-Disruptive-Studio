import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThematicService {

    constructor(
        private http: HttpClient,
    ) { }
    URL: string = 'http://localhost:3000/'
    
    get() {
        return this.http.get<any>(this.URL + 'thematic')
    }

    create(data:any) {
        return this.http.post<any>(this.URL + 'thematic', data)
    }
}
