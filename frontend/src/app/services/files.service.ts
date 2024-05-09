import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FilesService {

    constructor(
        private http: HttpClient,
    ) { }
    URL: string = 'http://localhost:3000/'

    createFile(form: any) {
        return this.http.post<any>(this.URL + 'files', form)
    }

    get(data: any) {
        return this.http.get<any>(this.URL + 'files', { params: data })
    }

    getFile(url: string) {
        return this.http.get<File | any>(this.URL + 'files/view/', { params: { url } })
    }

}
