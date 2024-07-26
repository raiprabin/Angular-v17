import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock AuthService
const mockAuthService = {
  loading$: of({ emailSignIn: false, googleSignIn: false }),
  signIn: jest.fn().mockResolvedValue(true),
  googleSignIn: jest.fn().mockResolvedValue(true),
};

// Mock ActivatedRoute
const mockActivatedRoute = {};

// Mock MatSnackBar
const mockMatSnackBar = {
  open: jest.fn()
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    snackBar = TestBed.inject(MatSnackBar);

    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'navigate'); // Spy on router navigate method

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initially invalid form', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call AuthService signIn method on form submit if form is valid', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();
    expect(authService.signIn).toHaveBeenCalledWith('test@example.com', 'password123');
    
  });

  it('should show error message if signIn fails', async () => {
    authService.signIn = jest.fn().mockRejectedValue(new Error('Sign In Failed'));
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    await component.onSubmit();
    expect(authService.signIn).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(snackBar.open).toHaveBeenCalledWith('Sign In Failed', 'Close', { duration: 3000, panelClass: ['error-toast'] });
  });

  it('should navigate to home after successful login', async () => {
    // Arrange
    const email = 'prabin.rai+1@intuji.com';
    const password = 'Admin123@';
    mockAuthService.signIn = jest.fn().mockResolvedValueOnce(undefined); // Simulate successful sign-in

    component.loginForm.setValue({ email, password });
    
    // Act
    await component.onSubmit(); // Trigger form submission

    // Assert
    expect(authService.signIn).toHaveBeenCalledWith(email, password);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']); // Check if navigation to home happened
  });

});
