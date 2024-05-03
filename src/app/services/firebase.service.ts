import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  increment,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import firebase from 'firebase/compat';
import User = firebase.User;

export interface Message {
  id: number;
  username: string;
  userImage: string;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  firestore = inject(Firestore);
  collection = collection(this.firestore, 'messenger');

  getMessages(): Observable<Message[]> {
    return collectionData(this.collection) as Observable<Message[]>;
  }

  sendMessage(newMessage: Message) {
    addDoc(this.collection, newMessage)
      .then((event) => {
        console.log('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
}
