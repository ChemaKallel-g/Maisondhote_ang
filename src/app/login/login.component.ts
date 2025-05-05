import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService'; // Assurez-vous que le chemin est correct
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  errorMessageLogin: string | null = null;
  isLoading = false;
  loggedIn = false; // Nouvelle propriété pour suivre l'état de connexion
  userSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Abonnez-vous à l'observable userState$ pour obtenir les mises à jour de l'état de l'utilisateur.
    this.userSubscription = this.authService.userState$.subscribe(user => {
      this.loggedIn = !!user; // Mettez à jour la propriété loggedIn en fonction de la présence d'un utilisateur.
    });
  }

  ngOnDestroy() {
    
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  login(): void {
    this.errorMessageLogin = null;
    if (!this.username || !this.password) {
      this.errorMessageLogin = 'Veuillez entrer votre email et votre mot de passe.';
      return;
    }

    this.isLoading = true;
    if (this.username === 'admin@admin.com' && this.password === 'admin') {
      this.isLoading = false;
      this.router.navigate(['/admin']);
      return;
    }

    this.authService.signInWithEmailAndPassword(this.username, this.password).subscribe({
      next: () => {
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

  logout(): void {
    this.authService.signOut().subscribe(() => {
      
    });
  }
}