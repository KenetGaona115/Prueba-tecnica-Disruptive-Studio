import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    alias: new FormControl(null, [Validators.required]),
    tipo: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
  )

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    if (!this.registerForm.valid ||
      this.registerForm.get('password')?.value != this.registerForm.get('passwordConfirm')?.value) {
      return;
    }
    const user = {
      email: this.registerForm.get('email')?.value,
      alias: this.registerForm.get('alias')?.value,
      tipoUsuario: this.registerForm.get('tipo')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this.authService.singUp(user).subscribe(
      (result) => {
        if (result.success) {
          this.router.navigate(['login'])
          return;
        }
        alert('Datos no validos')
      }
    );
  }

}