import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  error: any = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    this.error = null;
    if (this.form.valid) {
      this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)
        .subscribe(
          (response) => {
            if (response.success) {
              localStorage.setItem('user', JSON.stringify(response.user));
              this.router.navigate(['/home'])
            }
            this.error = response.message
          });
    }
  }
}
