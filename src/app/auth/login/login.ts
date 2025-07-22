import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.auth.login(credentials).subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = 'Invalid email or password';
        }
      });
    }
  }
}
