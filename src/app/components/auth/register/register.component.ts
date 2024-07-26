import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { map, Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  loading$: Observable<{ emailSignUp: boolean }> = this.authService.loading$;

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.signUp(this.email, this.password);
  }
  isEmailSignUpLoading(): Observable<boolean> {
    return this.loading$.pipe(
      map(state => state.emailSignUp)
    );
  }


  // navigateToLogin() {
  //   this.router.navigate(['/login']);
  // }
}
