import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private afAuth: Auth) {}

  login() {
    signInWithPopup(this.afAuth, new GoogleAuthProvider()).then((event) => {});
  }

  logout() {
    signOut(this.afAuth).then(() => {});
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }
}
