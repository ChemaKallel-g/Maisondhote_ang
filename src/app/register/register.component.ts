import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
import { ApiService } from 'src/Services/api-service.service'; 

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newName: string = '';
  newUsername: string = '';
  newPassword: string = '';
  errorMessageRegistre: string | null = null;
  isSigningUp: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private apiService: ApiService
  ) {}

  register(): void {
    this.isSigningUp = true;
    if (!this.newUsername || !this.newPassword || !this.newName) {
      this.errorMessageRegistre = 'Veuillez entrer un nom, un email et un mot de passe.';
      this.isSigningUp = false;
      return;
    }

    console.log('Tentative d\'inscription avec les données:', {
      newName: this.newName,
      newUsername: this.newUsername,
      newPassword: this.newPassword,
    });

    this.authService.signUpWithEmailAndPassword(this.newUsername, this.newPassword).subscribe({
      next: (user) => {
        console.log('Inscription Firebase réussie!', user);
        this.isSigningUp = false; 
        this.router.navigate(['/login']);
      },
      error: (authError: any) => {
        console.error('Erreur d\'inscription Firebase:', authError);
        this.errorMessageRegistre = 'Erreur lors de l\'inscription.';
        this.isSigningUp = false;
      },
    });
  }}