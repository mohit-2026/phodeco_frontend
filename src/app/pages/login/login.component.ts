import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveSession(res.token, res.user);
        const role = res.user.role;
        if (role === 'couple') this.router.navigate(['/vendors']);
        if (role === 'vendor') this.router.navigate(['/']);
        if (role === 'admin')  this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}