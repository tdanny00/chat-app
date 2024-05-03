import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './components/login/login-routing.module';
import { environment } from '../environments/environment';
import firebase from 'firebase/compat';
import initializeApp = firebase.initializeApp;
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
