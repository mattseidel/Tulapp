import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  iseLoggedIn = false;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  getUserData() {
    return this.auth.authState.pipe(map((auth) => auth));
  }

  getUserId(): any {
  }

  onLogOut() {
    return this.auth.signOut();
  }

  onSignIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userData) => resolve(userData))
        .catch((err) => console.log(reject(err)));
    });
  }
  onSingUp(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((userData) => {
          resolve(userData);
        })
        .catch((err) => console.log(reject(err)));
    });
  }
}
