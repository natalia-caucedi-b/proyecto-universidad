import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;

      this.authService.login(usuario, contrasena).subscribe({
        next: (res) => {
          alert('Inicio de sesión exitoso');
          console.log('Administrador:', res.admin);
           // Guardamos el nombre en localStorage
          localStorage.setItem('nombreAdmin', res.admin.nombre);
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error(err);
          alert('Credenciales incorrectas');
        },
      });
    }
  }

  registrarse() {
    this.router.navigate(['/registro']);
  }
}
