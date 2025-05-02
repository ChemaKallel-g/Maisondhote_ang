import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessageLogin: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessageLogin = null;

    // Vérification des champs vides
    if (!this.username || !this.password) {
      this.errorMessageLogin = 'Veuillez entrer votre email et votre mot de passe.';
      return;
    }

    this.isLoading = true;

    // Connexion admin (cas spécial)
    if (this.username === 'admin@admin.com' && this.password === 'admin') {
      this.isLoading = false;
      this.router.navigate(['/admin']);
      return;
    }

    // Connexion utilisateur normale via AuthService
    this.authService.signInWithEmailAndPassword(this.username, this.password).subscribe({
      next: (user) => {
        console.log('Connexion réussie!', user);
        localStorage.setItem('email', this.username);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur de connexion:', error);
        this.errorMessageLogin = 'Email ou mot de passe incorrect !';
        this.isLoading = false;
      },
    });
  }
}
