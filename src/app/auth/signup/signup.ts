import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
})
export class SignupComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(AuthService);

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  error = '';

  onSubmit() {
    if (this.signupForm.valid) {
      const data = this.signupForm.value;

      this.auth.signup(data).subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Signup failed. Please try again.';
          console.error(err);
        }
      });
    }
  }
}
