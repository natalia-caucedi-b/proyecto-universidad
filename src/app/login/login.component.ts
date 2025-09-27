import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() { this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === 'admin') {
        alert('Ingreso exitoso como administrador');
        this.router.navigate(['/admin']);
        
      } else {
        alert('Credenciales incorrectas');
      }
    }
  }
  registrarse(){
this.router.navigate(['/registro']); 
  }
}