import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
    ) { }
    URL: string = 'http://localhost:3000/'

    login(email: string, password: string) {
        return this.http.post<any>(this.URL + 'auth/login', { email: email, password: password })
    }

    singUp(data: any) {
        return this.http.post<any>(this.URL + 'user/', data)
    }

    public isAuthenticated(): boolean {
        const user = localStorage.getItem('user')
        return !!user;
    }

    returnUser() {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    }

}
