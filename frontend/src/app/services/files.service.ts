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

    updateFile(form: any, id: any) {
        return this.http.put<any>(this.URL + 'files/', form, { params: { id: id } })
    }

    get(data: any) {
        return this.http.get<any>(this.URL + 'files', { params: data })
    }

    getByName(name: any) {
        return this.http.get<any>(this.URL + 'files/nombre', { params: { nombre: name } })
    }

    getThematic(name: any) {
        return this.http.get<any>(this.URL + 'files/', { params: { tema: name } })
    }

    getOne(id: any) {
        return this.http.get<any>(this.URL + 'files/one', { params: { id } })
    }

    getFile(url: string) {
        return this.http.get<File | any>(this.URL + 'files/view/', { params: { url } })
    }

    delete(id: any) {
        return this.http.delete<any>(this.URL + 'files/', { params: { id } })
    }

}
