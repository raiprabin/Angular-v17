import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterOutlet,
    RouterModule,
    NgIf,
    AsyncPipe,
    MatProgressSpinner,
    ReactiveFormsModule, // Import ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  loading$: Observable<{ emailSignIn: boolean; googleSignIn: boolean }> = this.authService.loading$;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, // Inject FormBuilder
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private router: Router,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', Validators.required] // Password validation
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.authService.signIn(email, password).catch(error =>{
  //       this.showError(error.message)
  //     })
  //   }
  // }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email, password)
        .then(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/home']);
          });
        })
        .catch(error => this.showError(error.message));
    }
  }

  async onSignInWithGoogle() {
    this.authService.googleSignIn().catch(error =>{
      this.showError(error.message)
    });
  }

  isEmailSignInLoading(): Observable<boolean> {
    return this.loading$.pipe(
      map(state => state.emailSignIn)
    );
  }

  isGoogleSignInLoading(): Observable<boolean> {
    return this.loading$.pipe(
      map(state => state.googleSignIn)
    );
  }
  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }
}
