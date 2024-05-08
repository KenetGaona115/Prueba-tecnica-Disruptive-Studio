import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
    ) { }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:3000/auth/login', { email: email, password: password })
    }

    public isAuthenticated(): boolean {
        const user = localStorage.getItem('user')
        return !!user;
    }

}
