import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ingresar() {
    const credentials = {
      correo: this.form.value.correo,
      password: this.form.value.password
    };

    this.loading = true;

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);

        // Si el backend devuelve un token o mensaje, lo puedes guardar:
        // localStorage.setItem('token', response.token);
        this.router.navigate(['dashboard']);
      },

      error: (err) => {
        console.error('Error en login', err);
        this.error();
        this.form.reset();
        this.loading = false;
      }
    });
  }

  error() {
    this._snackbar.open('Correo o contraseña incorrecto.', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
