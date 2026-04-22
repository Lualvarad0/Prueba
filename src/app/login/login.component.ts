import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginStatus: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid && this.loginForm.value.username === 'admin'
                              && this.loginForm.value.password === 'admin') {
      this.loginStatus = 'success';
      localStorage.setItem('isLoggedIn', 'true');
      setTimeout(() => {
        this.router.navigate(['/busqueda']);
        this.loading = false;
      }, 1000);
    } else {
      this.loginStatus = 'invalid';
      this.loading = false;
    }
  }

}

