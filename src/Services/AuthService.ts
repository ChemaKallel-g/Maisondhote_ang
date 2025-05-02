import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { catchError, map, switchMap, tap } from 'rxjs/operators';



import { from, Observable, of } from 'rxjs';



@Injectable({

 providedIn: 'root',

})

export class AuthService {

 constructor(public afAuth: AngularFireAuth) {}



 signUpWithEmailAndPassword(email: string, password: string): Observable<any> {

 return from(this.afAuth.createUserWithEmailAndPassword(email, password));

 }



 signInWithEmailAndPassword(email: string, password: string): Observable<any> {

 return from(this.afAuth.signInWithEmailAndPassword(email, password));

 }


 signOut(): Observable<void> {

 return from(this.afAuth.signOut());

 }



 sendPasswordResetEmail(email: string): Observable<void> {

 return from(this.afAuth.sendPasswordResetEmail(email));

 }



 // Vous pouvez conserver ces méthodes pour suivre l'état de l'utilisateur si nécessaire

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

 })

 );
}



private get user(): Observable<firebase.default.User | null> {

 return this.afAuth.user;

 }

}