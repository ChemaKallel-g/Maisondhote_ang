import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject, from, of } from 'rxjs';

import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/compat'; // Importez le module compat

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userStateSubject = new BehaviorSubject<firebase.default.User | null>(null);
  public userState$ = this.userStateSubject.asObservable();

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.userStateSubject.next(user);
    });
  }

  signUpWithEmailAndPassword(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((userCredential) => {
        this.userStateSubject.next(userCredential.user);
        localStorage.setItem('currentUser', JSON.stringify(userCredential.user)); // Persist user data
      }),
     
    );
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap((userCredential) => {
        this.userStateSubject.next(userCredential.user);
        localStorage.setItem('currentUser', JSON.stringify(userCredential.user)); // Persist user data
      }),
     
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      tap(() => {
        this.userStateSubject.next(null);
        localStorage.removeItem('currentUser'); // Clear persisted data
        this.router.navigate(['/login']);
      })
    );
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(this.afAuth.sendPasswordResetEmail(email))
  }

  getAuthState(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  getUser(): Observable<firebase.default.User | null> {
    return this.afAuth.user;
  }

  getIdToken(): Observable<string | null> {
    return this.user.pipe(
      switchMap(user => {
        if (user) {
          return from(user.getIdToken());
        } else {
          return of(null);
        }
      }),
      
    );
  }

  private get user(): Observable<firebase.default.User | null> {
    return this.afAuth.user;
  }

  
}