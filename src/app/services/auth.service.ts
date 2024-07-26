import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loadingSubject = new BehaviorSubject<{ emailSignIn: boolean; googleSignIn: boolean, emailSignUp: boolean }>({
    emailSignIn: false,
    googleSignIn: false,
    emailSignUp: false
  });
  public loading$ = this.loadingSubject.asObservable();
  constructor(private auth: Auth, private router: Router) { }

  async signUp(email: string, password: string) {
    try {
      this.loadingSubject.next({ ...this.loadingSubject.value, emailSignUp: true });
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during sign up', error);
    }
    finally {
      this.loadingSubject.next({ ...this.loadingSubject.value, emailSignUp: false });
    }
  }

  async signIn(email: string, password: string) {
    try {
      this.loadingSubject.next({ ...this.loadingSubject.value, emailSignIn: true });
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      throw new Error('Invalid email or password.'); // Or customize the error message based on the exception
    }
    finally {
      this.loadingSubject.next({ ...this.loadingSubject.value, emailSignIn: false });
      }
  }

  async googleSignIn() {
    try {
      this.loadingSubject.next({ ...this.loadingSubject.value, googleSignIn: true });
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during Google sign-in', error);
      throw new Error('Error during Google sign-in.'); // Or customize the error message based on the exception

    } finally {
    this.loadingSubject.next({ ...this.loadingSubject.value, googleSignIn: false });
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
      // this.router.navigateByUrl('/login', { replaceUrl: true });
      // setTimeout(() => this.router.navigateByUrl('/login'), 0);


    } catch (error) {
      console.error('Error during sign out', error);
    }
  }
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
